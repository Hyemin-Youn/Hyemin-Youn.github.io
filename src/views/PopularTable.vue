<template>
  <div class="popular-table">
    <!-- 영화 리스트 -->
    <div class="movie-grid">
      <MovieCard v-for="movie in paginatedMovies" :key="movie.id" :movie="movie" />
    </div>

    <!-- Pagination -->
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @change-page="changePage"
    />
  </div>
</template>

<script>
import MovieCard from "@/components/MovieCard.vue";
import Pagination from "@/components/Pagination.vue";
import { fetchPopularMovies } from "../api/movies";

export default {
  name: "PopularTable",
  components: {
    MovieCard,
    Pagination,
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
    async fetchMovies(page = 1) {
      const data = await fetchPopularMovies(page);
      this.movies = data.results;
      this.currentPage = page;
      this.totalPages = data.total_pages;
    },
    changePage(page) {
      this.fetchMovies(page);
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
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
