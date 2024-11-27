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
        <img
          class="movie-poster"
          :src="getPosterUrl(movie.poster_path)"
          :alt="movie.title"
        />
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
import { mapActions } from "vuex";

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
    dropdownEntries() {
      return Object.entries(this.dropdowns).map(([key, options]) => ({
        key,
        options,
      }));
    },
  },
  methods: {
    ...mapActions(["addSearchHistory", "setSearchResults"]),
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

      console.log("검색 시작:", this.searchQuery);
      this.loading = true;

      try {
        this.addSearchHistory(this.searchQuery);
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
