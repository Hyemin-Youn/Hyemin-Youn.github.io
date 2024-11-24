<template>
  <div class="search-page">
    <Navbar />
    <div class="content">
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
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>

      <Pagination
        v-if="viewMode === 'table'"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @change-page="fetchMovies"
      />
      
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MovieCard from "@/components/MovieCard.vue";
import Pagination from "@/components/Pagination.vue";
import { fetchMovies } from "@/api/movies";

export default {
  components: {
    Navbar,
    MovieCard,
    Pagination,
  },
  data() {
    return {
      movies: [],
      currentPage: 1,
      totalPages: 1,
      selectedOptions: {
        originalLanguage: "장르 (전체)",
        translationLanguage: "평점 (전체)",
        sorting: "언어 (전체)",
      },
      activeDropdown: null,
    };
  },
  methods: {
    async fetchMovies(page = 1) {
      const filters = {
        genre: this.selectedOptions.originalLanguage,
        rating: this.selectedOptions.translationLanguage,
        language: this.selectedOptions.sorting,
        page,
      };
      const data = await fetchMovies(filters);
      this.movies = data.results;
      this.totalPages = data.total_pages;
      this.currentPage = page;
    },
    toggleDropdown(key) {
      this.activeDropdown = this.activeDropdown === key ? null : key;
    },
    selectOption(key, option) {
      this.selectedOptions[key] = option;
      this.fetchMovies(1); // 필터 변경 시 첫 페이지로 이동
    },
    clearOptions() {
      this.selectedOptions = {
        originalLanguage: "장르 (전체)",
        translationLanguage: "평점 (전체)",
        sorting: "언어 (전체)",
      };
      this.fetchMovies(1); // 초기화 후 첫 페이지로 이동
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

.content {
  padding: 20px;
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
</style>
