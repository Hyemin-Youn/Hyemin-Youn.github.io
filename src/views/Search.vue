<template>
  <div class="search-page">
    <!-- Navbar -->
    <Navbar />

    <!-- 검색 기능 -->
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
    <div v-if="recentSearches.length" class="recent-searches">
      <h2>최근 검색어</h2>
      <ul>
        <li v-for="(query, index) in recentSearches" :key="index" @click="searchFromHistory(query)">
          {{ query }}
        </li>
      </ul>
    </div>

    <!-- 영화 리스트 -->
    <div class="movie-grid">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @toggleWishlist="toggleWishlist(movie)"
        @addViewHistory="addViewHistory(movie)"
      />
    </div>

    <!-- 즐겨찾기 영화 -->
    <div v-if="wishlist.length" class="wishlist">
      <h2>즐겨찾기한 영화</h2>
      <ul>
        <li v-for="movie in wishlist" :key="movie.id">
          {{ movie.title }}
          <button @click="toggleWishlist(movie)">즐겨찾기 제거</button>
        </li>
      </ul>
    </div>

    <!-- 로딩 표시 -->
    <div v-if="loading" class="loading">로딩 중...</div>

    <!-- TOP 버튼 -->
    <button v-if="showScrollTopButton" class="scroll-top" @click="scrollToTop">
      TOP(위로)
    </button>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MovieCard from "@/components/MovieCard.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Search",
  components: {
    Navbar,
    MovieCard,
  },
  data() {
    return {
      searchQuery: "",
      movies: [],
      currentPage: 1,
      totalPages: 1,
      loading: false,
      showScrollTopButton: false,
    };
  },
  computed: {
    ...mapGetters(["searchHistory", "wishlist", "viewHistory"]),
    recentSearches() {
      return this.searchHistory.slice().reverse(); // 최신순
    },
  },
  methods: {
    ...mapActions(["addSearchHistory", "toggleWishlist", "addViewHistory"]),
    async handleSearch() {
      if (!this.searchQuery.trim()) return;

      // 검색 기록 저장
      this.addSearchHistory(this.searchQuery);

      // 검색 API 호출 (fetchMovies를 대체할 API 사용 가능)
      this.loading = true;
      try {
        const data = await fetchMovies({ query: this.searchQuery });
        this.movies = data.results;
        this.totalPages = data.total_pages;
        this.currentPage = 1;
      } catch (error) {
        console.error("검색 중 오류 발생:", error);
      } finally {
        this.loading = false;
      }
    },
    searchFromHistory(query) {
      this.searchQuery = query;
      this.handleSearch();
    },
    toggleWishlist(movie) {
      this.$store.dispatch("toggleWishlist", movie); // 즐겨찾기 추가/제거
    },
    addViewHistory(movie) {
      this.$store.dispatch("addViewHistory", movie); // 시청 기록 추가
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.search-page {
  background-color: #121212;
  color: white;
  min-height: 100vh;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.search-bar input {
  width: 70%;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-bar button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #0056b3;
}

.recent-searches,
.wishlist {
  margin-top: 20px;
  padding: 0 20px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  padding-top: 20px;
}

.scroll-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #e50914;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
