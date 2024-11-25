<template>
  <div class="search-page">
    <!-- Navbar -->
    <Navbar />

    <!-- 검색 기능 -->
    <h1>영화 검색</h1>
    <div class="dropdown-container">
      <div class="filter-box">
        <label for="genre-filter">장르</label>
        <select id="genre-filter" v-model="selectedOptions.originalLanguage" @change="fetchMovies">
          <option v-for="option in dropdowns.originalLanguage" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="filter-box">
        <label for="rating-filter">평점</label>
        <select id="rating-filter" v-model="selectedOptions.translationLanguage" @change="fetchMovies">
          <option v-for="option in dropdowns.translationLanguage" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="filter-box">
        <label for="language-filter">언어</label>
        <select id="language-filter" v-model="selectedOptions.sorting" @change="fetchMovies">
          <option v-for="option in dropdowns.sorting" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <button class="clear-options" @click="clearOptions">초기화</button>
    </div>

    <!-- 영화 리스트 -->
    <div class="movie-grid">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>

    <!-- 로딩 표시 -->
    <div v-if="loading" class="loading">로딩 중...</div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MovieCard from "@/components/MovieCard.vue";
import { fetchMovies } from "@/api/movies";

export default {
  name: "Search",
  components: {
    Navbar,
    MovieCard,
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
      movies: [],
      currentPage: 1,
      totalPages: 1,
      loading: false,
    };
  },
  methods: {
    async fetchMovies(page = 1, append = false) {
      if (this.loading || page > this.totalPages) return;

      this.loading = true;

      try {
        const filters = {
          genre: this.selectedOptions.originalLanguage,
          rating: this.selectedOptions.translationLanguage,
          language: this.selectedOptions.sorting,
          page,
        };

        const data = await fetchMovies(filters);

        if (append) {
          this.movies = [...this.movies, ...data.results];
        } else {
          this.movies = data.results;
        }

        this.currentPage = page;
        this.totalPages = data.total_pages;
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error);
      } finally {
        this.loading = false;
      }
    },
    clearOptions() {
      this.selectedOptions = { ...this.DEFAULT_OPTIONS };
      this.fetchMovies(1);
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
  padding: 20px;
}

.dropdown-container {
  background-color: #2d2d2d; /* 회색 박스 */
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
  align-items: flex-end;
}

.filter-box {
  display: flex;
  flex-direction: column;
}

.filter-box label {
  margin-bottom: 5px;
  font-size: 14px;
}

.filter-box select {
  padding: 8px;
  background-color: #444;
  color: white;
  border: none;
  border-radius: 4px;
}

.clear-options {
  padding: 8px 16px;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.clear-options:hover {
  background-color: #d40813;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.loading {
  text-align: center;
  margin: 20px 0;
}
</style>
