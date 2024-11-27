<template>
  <div class="search-page">
    <!-- Navbar -->
    <Navbar />

    <!-- 검색창 -->
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="영화 제목을 검색하세요"
        @keydown.enter="handleSearch"
      />
      <button @click="handleSearch">검색</button>
    </div>

    <!-- 최근 검색어 -->
    <div v-if="searchHistory.length" class="recent-searches">
      <h2>최근 검색어</h2>
      <ul>
        <li
          v-for="(query, index) in searchHistory"
          :key="index"
          @click="searchFromHistory(query)"
        >
          {{ query }}
        </li>
      </ul>
    </div>

    <!-- 필터 -->
    <div class="dropdown-container">
      <label>선호하는 설정을 선택하세요</label>
      <div v-for="dropdown in dropdownEntries" :key="dropdown.key" class="custom-select">
        <div class="select-selected" @click="toggleDropdown(dropdown.key)">
          {{ filters[dropdown.key] === "all" ? dropdown.label : filters[dropdown.key] }}
        </div>
        <div v-if="activeDropdown === dropdown.key" class="select-items">
          <div
            v-for="option in dropdown.options"
            :key="option.value"
            @click="setFilter(dropdown.key, option.value)"
          >
            {{ option.label }}
          </div>
        </div>
      </div>
      <button class="clear-options" @click="clearFilters">초기화</button>
    </div>

    <!-- 영화 리스트 -->
    <div class="movie-grid">
      <div class="movie-card" v-for="movie in movies" :key="movie.id">
        <img class="movie-poster" :src="getPosterUrl(movie.poster_path)" :alt="movie.title" />
        <div class="movie-title">{{ movie.title }}</div>
        <button @click="toggleWishlist(movie)">
          {{ isInWishlist(movie.id) ? "즐겨찾기 제거" : "즐겨찾기 추가" }}
        </button>
      </div>
    </div>

    <!-- 즐겨찾기 -->
    <div v-if="wishlist.length" class="wishlist">
      <h2>즐겨찾기한 영화</h2>
      <ul>
        <li v-for="movie in wishlist" :key="movie.id">
          {{ movie.title }}
          <button @click="toggleWishlist(movie)">즐겨찾기 제거</button>
        </li>
      </ul>
    </div>

    <!-- 로딩 중 표시 -->
    <div v-if="loading" class="loading">로딩 중...</div>
    <div v-if="!loading && movies.length === 0" class="no-results">검색 결과가 없습니다.</div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Search",
  components: {
    Navbar,
  },
  data() {
    return {
      searchQuery: "",
      activeDropdown: null,
      dropdowns: [
        {
          key: "genre",
          label: "장르 (전체)",
          options: [
            { label: "전체", value: "all" },
            { label: "액션", value: "28" },
            { label: "코미디", value: "35" },
            { label: "모험", value: "12" },
          ],
        },
        {
          key: "rating",
          label: "평점 (전체)",
          options: [
            { label: "전체", value: "all" },
            { label: "7점 이상", value: "7" },
            { label: "8점 이상", value: "8" },
          ],
        },
        {
          key: "language",
          label: "언어 (전체)",
          options: [
            { label: "전체", value: "all" },
            { label: "영어", value: "en" },
            { label: "한국어", value: "ko" },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState(["filters"]),
    ...mapGetters(["searchHistory", "wishlist", "movies", "loading"]),
  },
  methods: {
    ...mapActions(["addSearchHistory", "toggleWishlist", "fetchMovies"]),
    handleSearch() {
      if (this.searchQuery.trim()) {
        this.addSearchHistory(this.searchQuery);
        this.fetchMovies({ query: this.searchQuery });
      }
    },
    searchFromHistory(query) {
      this.searchQuery = query;
      this.handleSearch();
    },
    setFilter(key, value) {
      this.$store.dispatch("setFilter", { key, value });
      this.activeDropdown = null;
    },
    clearFilters() {
      this.dropdownEntries.forEach(({ key }) => {
        this.setFilter(key, "all");
      });
    },
    toggleDropdown(key) {
      this.activeDropdown = this.activeDropdown === key ? null : key;
    },
    getPosterUrl(path) {
      return path ? `https://image.tmdb.org/t/p/w500/${path}` : "default_poster.png";
    },
    isInWishlist(id) {
      return this.wishlist.some((movie) => movie.id === id);
    },
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
.search-page {
  background-color: #121212;
  color: white;
  min-height: 100vh;
}
.dropdown-container {
  margin: 20px 0;
  display: flex;
  gap: 15px;
}
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}
.movie-card {
  text-align: center;
  background-color: #1e1e1e;
  padding: 10px;
  border-radius: 8px;
}
.movie-poster {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 10px;
  object-fit: cover;
}
.movie-title {
  font-size: 14px;
  color: white;
}
.loading {
  text-align: center;
  margin: 20px 0;
}
</style>