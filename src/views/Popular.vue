<template>
    <div class="popular">
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
  </template>
  
  <script>
  import MovieCard from '@/components/MovieCard';
  import Pagination from '@/components/Pagination';
  import { fetchPopularMovies } from '@/api/movies';
  
  export default {
    components: {
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
  .movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
  }
  </style>
  