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
  export default {
    data() {
      return {
        currentPage: 1,
        movies: [],
      };
    },
    methods: {
      fetchMovies() {
        // Replace with actual API call
        this.movies = Array.from({ length: 10 }, (_, i) => ({
          title: `Movie ${(this.currentPage - 1) * 10 + i + 1}`,
        }));
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
  