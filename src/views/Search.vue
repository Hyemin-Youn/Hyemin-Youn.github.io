<template>
  <div class="search-page">
    <!-- Navbar -->
    <Navbar />

    <!-- 검색 필터 -->
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
    <div class="movie-table">
      <div class="movie-row" v-for="movie in movies" :key="movie.id">
        <img class="movie-poster" :src="getPosterUrl(movie.poster_path)" :alt="movie.title" />
        <div class="movie-title">{{ movie.title }}</div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">이전</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">다음</button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { fetchMovies } from "@/api/movies";

export default {
  name: "Search",
  components: {
    Navbar,
  },
  data() {
    return {
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
    async fetchMovies(page = 1) {
      const filters = {
        genre: this.selectedOptions.originalLanguage,
        rating: this.selectedOptions.translationLanguage,
        language: this.selectedOptions.sorting,
        page,
      };

      try {
        const data = await fetchMovies(filters);
        this.movies = data.results;
        this.totalPages = data.total_pages;
        this.currentPage = page;
      } catch (error) {
        console.error("API 호출 오류:", error);
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
      this.fetchMovies(1); // 첫 페이지로 다시 로드
    },
    clearOptions() {
      this.selectedOptions = { ...this.DEFAULT_OPTIONS };
      this.fetchMovies(1); // 초기화 후 첫 페이지 로드
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.fetchMovies(page);
      }
    },
    getPosterUrl(path) {
      return `https://image.tmdb.org/t/p/w500/${path}`;
    },
  },
  created() {
    this.fetchMovies(); // 페이지 로드 시 초기 데이터 로드
  },
};
</script>

<style scoped>
.search-page {
  background-color: #121212;
  color: white;
  min-height: 100vh;
  padding: 20px;
}

.dropdown-container {
  margin: 20px 0;
  display: flex;
  gap: 15px;
}

.movie-table {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.movie-row {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  background-color: #1e1e1e;
  border-radius: 8px;
}

.movie-poster {
  width: 100px;
  height: 150px;
  border-radius: 8px;
}

.movie-title {
  font-size: 18px;
  color: white;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

button {
  background-color: #e50914;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:disabled {
  background-color: #444;
  cursor: not-allowed;
}
</style>
