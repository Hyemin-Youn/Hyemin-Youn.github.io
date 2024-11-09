<!-- src/views/Home.vue -->
<template>
  <div>
    <h1>Popular Movies</h1>
    <div v-if="movies.length">
      <div v-for="movie in movies" :key="movie.id" class="movie">
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.overview }}</p>
        <img :src="getImageUrl(movie.poster_path)" alt="Movie poster" />
      </div>
    </div>
    <div v-else>
      <p>Loading movies...</p>
    </div>
  </div>
</template>

<script>
import { fetchPopularMovies } from '../URL';

export default {
  name: 'Home',
  data() {
    return {
      movies: []
    };
  },
  methods: {
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`;
    }
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

<style scoped>
.movie {
  margin: 10px 0;
}
</style>
