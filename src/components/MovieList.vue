<template>
    <div>
      <h2>Movie List</h2>
      <ul>
        <li v-for="movie in movies" :key="movie.id">{{ movie.title }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import { fetchMovies } from '../utils/api';
  
  export default {
    data() {
      return {
        movies: [],
      };
    },
    async created() {
      this.movies = await fetchMovies();
    },
  };
  </script>
  