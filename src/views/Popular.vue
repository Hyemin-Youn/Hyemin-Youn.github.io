<template>
  <div class="popular">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <div class="content">
      <h1>인기 영화</h1>
      <div class="movie-grid">
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
      <Pagination
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
import { fetchPopularMovies } from "@/api/movies";

export default {
  name: "Popular",
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
    };
  },
  methods: {
    async fetchMovies(page = 1) {
      const data = await fetchPopularMovies(page);
      this.movies = data.results;
      this.currentPage = page;
      this.totalPages = data.total_pages;
    },
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
.popular {
  padding: 20px;
  background-color: #121212;
  color: #fff;
}

.content {
  margin-top: 20px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}
</style>
