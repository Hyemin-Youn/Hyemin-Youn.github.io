<template>
    <div>
      <div v-for="(movie, index) in movies" :key="index">
        <p>{{ movie.title }}</p>
      </div>
      <div v-if="loading" class="loading">Loading...</div>
      <button v-if="showTopButton" @click="scrollToTop">Top</button>
    </div>
  </template>
  
  <script>
import { fetchPopularMovies } from '../api/movies';

export default {
  data() {
    return {
      movies: [],
      page: 1,
      loading: false,
    };
  },
  methods: {
    async fetchMovies() {
      this.loading = true;
      const newMovies = await fetchPopularMovies(this.page);
      this.movies = [...this.movies, ...newMovies];
      this.loading = false;
    },
    handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        this.page++;
        this.fetchMovies();
      }
    },
  },
  created() {
    this.fetchMovies();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>
