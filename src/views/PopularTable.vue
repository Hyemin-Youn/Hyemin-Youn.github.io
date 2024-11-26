<template>
  <div class="popular-table">
    <!-- 영화 리스트 -->
    <div class="movie-grid">
      <MovieCard v-for="movie in paginatedMovies" :key="movie.id" :movie="movie" />
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">이전</button>
      <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">다음</button>
    </div>
  </div>
</template>

<script>
import MovieCard from "@/components/MovieCard.vue";
import { fetchPopularMovies } from "@/api/movies";

export default {
  name: "PopularTable",
  components: {
    MovieCard,
  },
  props: {
    initialMovies: {
      type: Array,
      required: true,
    },
    initialPage: {
      type: Number,
      default: 1,
    },
    initialTotalPages: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      movies: this.initialMovies,
      currentPage: this.initialPage,
      totalPages: this.initialTotalPages,
    };
  },
  computed: {
    paginatedMovies() {
      const start = (this.currentPage - 1) * 8; // 한 페이지에 8개의 영화
      const end = start + 8;
      return this.movies.slice(start, end);
    },
  },
  methods: {
    async fetchMovies(page = 1) {
      const data = await fetchPopularMovies(page);
      this.movies = data.results;
      this.currentPage = page;
      this.totalPages = data.total_pages;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.fetchMovies(this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.fetchMovies(this.currentPage + 1);
      }
    },
  },
  created() {
    if (!this.movies.length) {
      this.fetchMovies(this.currentPage);
    }
  },
};
</script>

<style scoped>
.popular-table {
  padding: 20px;
  background-color: #121212;
  color: #fff;
  min-height: 100vh;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 10px;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:hover {
  background-color: #e50914;
}

.pagination button:disabled {
  background-color: #666;
  cursor: not-allowed;
}
</style>
