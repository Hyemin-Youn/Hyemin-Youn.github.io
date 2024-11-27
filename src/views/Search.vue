<template>
  <div class="search-page" @scroll="handleScroll">
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

    <!-- 드롭다운 필터 -->
    <h1>영화 검색</h1>
    <div class="dropdown-container">
      <label>선호하는 설정을 선택하세요</label>
      <div v-for="dropdown in dropdownEntries" :key="dropdown.key" class="custom-select">
        <div class="select-selected" @click="toggleDropdown(dropdown.key)">
          {{ selectedOptions[dropdown.key] }}
        </div>
        <div v-if="activeDropdown === dropdown.key" class="select-items">
          <div
            v-for="option in dropdown.options"
            :key="option"
            @click="selectOption(dropdown.key, option)"
          >
            {{ option }}
          </div>
        </div>
      </div>
      <button class="clear-options" @click="clearOptions">초기화</button>
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

    <!-- 로딩 중 표시 -->
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
import { fetchMovies } from "@/api/movies";

export default {
  name: "Search",
  components: {
    Navbar,
    MovieCard,
  },
  data() {
    return {
      searchQuery: "",
      dropdowns: {
        originalLanguage: ["장르 (전체)", "Action", "Adventure", "Comedy", "Crime", "Family"],
        translationLanguage: ["평점 (전체)", "9~10", "8~9", "7~8", "6~7", "5~6", "4~5", "4점 이하"],
        sorting: ["언어 (전체)", "en", "ko"],
      },
      DEFAULT_OPTIONS: {
        originalLanguage: "장르 (전체)",
        translationLanguage: "평점 (전체)",
        sorting: "언어 (전체)",
      },
      selectedOptions: {
        originalLanguage: "장르 (전체)",
        translationLanguage: "평점 (전체)",
        sorting: "언어 (전체)",
      },
      activeDropdown: null,
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
    dropdownEntries() {
      return Object.entries(this.dropdowns).map(([key, options]) => ({
        key,
        options,
      }));
    },
  },
  methods: {
    ...mapActions(["addSearchHistory", "toggleWishlist", "addViewHistory"]),
    async handleSearch() {
      if (!this.searchQuery.trim()) return;

      this.addSearchHistory(this.searchQuery);

      this.loading = true;
      try {
        const filters = {
          genre: this.selectedOptions.originalLanguage,
          rating: this.selectedOptions.translationLanguage,
          language: this.selectedOptions.sorting,
        };
        const data = await fetchMovies({ query: this.searchQuery, ...filters });
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
      this.$store.dispatch("toggleWishlist", movie);
    },
    addViewHistory(movie) {
      this.$store.dispatch("addViewHistory", movie);
    },
    toggleDropdown(key) {
      this.activeDropdown = this.activeDropdown === key ? null : key;
    },
    selectOption(key, option) {
      this.selectedOptions = {
        ...this.selectedOptions,
        [key]: option,
      };
      this.activeDropdown = null;
      this.handleSearch();
    },
    clearOptions() {
      this.selectedOptions = { ...this.DEFAULT_OPTIONS };
      this.handleSearch();
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    handleScroll() {
      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (bottomOfWindow && this.currentPage < this.totalPages) {
        this.fetchMovies(this.currentPage + 1, true);
      }
    },
  },
  created() {
    this.handleSearch();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
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
