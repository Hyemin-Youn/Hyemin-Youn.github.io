<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Movie Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(movie, index) in movies" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ movie.title }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }}</span>
        <button @click="nextPage">Next</button>
      </div>
    </div>
  </template>
  
  <script>
import { fetchPopularMovies } from '@/api/movies';

export default {
  data() {
    return {
      currentPage: 1,
      movies: [],
    };
  },
  methods: {
    async fetchMovies() {
      this.movies = await fetchPopularMovies(this.currentPage);
    },
    nextPage() {
      this.currentPage++;
      this.fetchMovies();
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchMovies();
      }
    },
  },
  created() {
    this.fetchMovies();
  },
};
</script>
