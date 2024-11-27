<template>
  <div class="search-page" @scroll="handleScroll">
    <!-- Navbar -->
    <Navbar />

    <!-- 검색 기능 -->
    <h1>영화 검색</h1>
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="영화 제목을 검색하세요"
        @keydown.enter="handleSearch"
      />
      <button @click="handleSearch">검색</button>
    </div>

    <!-- 최근 검색어 목록 -->
    <div class="recent-searches" v-if="recentSearches.length">
      <h3>최근 검색어</h3>
      <ul>
        <li v-for="(search, index) in recentSearches" :key="index">
          <span @click="searchFromHistory(search)">{{ search }}</span>
          <button class="delete-btn" @click="deleteSearchHistory(index)">X</button>
        </li>
      </ul>
    </div>

    <div class="dropdown-container">
      <label>선호하는 설정을 선택하세요</label>
      <div
        v-for="dropdown in dropdownEntries"
        :key="dropdown.key"
        class="custom-select"
      >
        <div
          class="select-selected"
          @click="toggleDropdown(dropdown.key)"
        >
          {{ selectedOptions[dropdown.key] }}
        </div>
        <div
          v-if="activeDropdown === dropdown.key"
          class="select-items"
        >
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
      <div class="movie-card" v-for="movie in movies" :key="movie.id">
        <div class="poster-container">
          <img
            class="movie-poster"
            :src="getPosterUrl(movie.poster_path)"
            :alt="movie.title"
          />
          <button
            class="favorite-btn"
            :class="{ favorited: isInWishlist(movie.id) }"
            @click="toggleWishlist(movie)"
          >
            ❤
          </button>
        </div>
        <div class="movie-title">{{ movie.title }}</div>
      </div>
    </div>

    <!-- 로딩 중 표시 -->
    <div v-if="loading" class="loading">로딩 중...</div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { fetchMovies, searchMovies } from "@/api/movies";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Search",
  components: {
    Navbar,
  },
  data() {
    return {
      searchQuery: "", // 영화 제목 검색
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
    };
  },
  computed: {
    ...mapGetters(["recentSearches", "wishlist", "isInWishlist"]),
    dropdownEntries() {
      return Object.entries(this.dropdowns).map(([key, options]) => ({
        key,
        options,
      }));
    },
  },
  methods: {
    ...mapActions(["addSearchHistory", "setSearchResults", "toggleWishlist", "deleteSearchHistory"]),
    async fetchMovies(page = 1, append = false) {
      if (this.loading) return;
      this.loading = true;

      const filters = {
        genre: this.selectedOptions.originalLanguage,
        rating: this.selectedOptions.translationLanguage,
        language: this.selectedOptions.sorting,
        page,
      };

      try {
        const data = await fetchMovies(filters);
        if (append) {
          this.movies = [...this.movies, ...data.results];
        } else {
          this.movies = data.results;
        }
        this.currentPage = page;
        this.totalPages = data.total_pages;
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        this.loading = false;
      }
    },
    async handleSearch() {
      if (!this.searchQuery.trim()) return;

      this.loading = true;
      try {
        this.addSearchHistory(this.searchQuery); // 검색어 저장
        const data = await searchMovies(this.searchQuery, 1);
        this.movies = data || [];
        this.currentPage = 1;
        this.totalPages = data.total_pages || 1;
        this.setSearchResults(this.movies);
      } catch (error) {
        console.error("검색 중 오류 발생:", error.message);
      } finally {
        this.loading = false;
      }
    },
    searchFromHistory(query) {
      this.searchQuery = query;
      this.handleSearch();
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
      this.fetchMovies(1);
    },
    clearOptions() {
      this.selectedOptions = { ...this.DEFAULT_OPTIONS };
      this.fetchMovies(1);
    },
    handleScroll() {
      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (bottomOfWindow && this.currentPage < this.totalPages) {
        this.fetchMovies(this.currentPage + 1, true);
      }
    },
    getPosterUrl(path) {
      return path
        ? `https://image.tmdb.org/t/p/w500/${path}`
        : "default_poster.png";
    },
  },
  created() {
    this.fetchMovies();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.poster-container {
  position: relative;
}

.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
}

.favorite-btn.favorited {
  color: red;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .movie-card {
    padding: 5px;
  }
  .movie-poster {
    height: 150px;
  }
}
</style>
