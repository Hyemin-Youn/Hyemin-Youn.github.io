<template>
  <div class="popular">
    <h1>대세 콘텐츠</h1>
    <div class="movie-grid">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
    <Pagination
      v-if="viewMode === 'table'"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @change-page="changePage"
    />
  </div>
</template>

<script>
import { fetchPopularMovies } from "@/api/movie";
import MovieCard from "@/components/MovieCard.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      movies: [],
      currentPage: 1,
      totalPages: 1,
      loading: false,
    };
  },
  components: {
    MovieCard,
    Pagination,
  },
  methods: {
    async loadPopularMovies() {
      try {
        this.loading = true;
        const data = await fetchPopularMovies(this.currentPage);
        this.movies = data.results;
        this.totalPages = data.total_pages;
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        alert("영화 데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.loadPopularMovies();
  },
};
</script>

<style>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  background-color: #181818;
  color: #fff;
}
</style>
