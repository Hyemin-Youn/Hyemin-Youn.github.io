<template>
  <div class="popular">
    <!-- Navbar -->
    <!-- <Navbar class="navbar" /> -->

    <!-- 영화 리스트 -->
    <div class="movie-grid">
      <MovieCard v-for="movie in paginatedMovies" :key="movie.id" :movie="movie" />
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        이전
      </button>
      <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
      <button
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        다음
      </button>
    </div>
  </div>
</template>

<script>
// import Navbar from "@/components/Navbar.vue";
import MovieCard from "@/components/MovieCard.vue";
import { fetchPopularMovies } from "../api/movies";

export default {
  name: "PopularTable",
  components: {
    // Navbar,
    MovieCard,
  },
  data() {
    return {
      movies: [],
      currentPage: 1,
      totalPages: 1,
      moviesPerPage: 8, // 한 페이지에 표시할 영화 수
    };
  },
  computed: {
    paginatedMovies() {
      const start = (this.currentPage - 1) * this.moviesPerPage;
      const end = start + this.moviesPerPage;
      return this.movies.slice(start, end);
    },
  },
  methods: {
    async fetchMovies() {
      const data = await fetchPopularMovies();
      this.movies = data.results;
      this.totalPages = Math.ceil(this.movies.length / this.moviesPerPage);
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
/* Navbar 고정 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #121212;
  border-bottom: 1px solid #333;
}

.popular {
  padding-top: 60px;
  background-color: #121212;
  color: #fff;
  min-height: 100vh;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4열 고정 */
  gap: 20px;
  padding: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.pagination button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #666;
  cursor: not-allowed;
}

.pagination span {
  color: #fff;
  margin: 0 10px;
}

.disable-scroll {
  overflow-y: hidden !important;
}

</style>
