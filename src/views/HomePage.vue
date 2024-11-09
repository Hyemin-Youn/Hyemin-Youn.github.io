<template>
  <div>
    <h1>Popular Movies</h1>
    <ul>
      <li v-for="movie in movies" :key="movie.id">{{ movie.title }}</li>
    </ul>
  </div>
</template>

<script>
import { fetchPopularMovies } from '@/URL';

export default {
  name: 'HomePage',
  data() {
    return {
      movies: []
    };
  },
  async created() {
    try {
      const response = await fetchPopularMovies();
      this.movies = response.data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }
};
</script>
