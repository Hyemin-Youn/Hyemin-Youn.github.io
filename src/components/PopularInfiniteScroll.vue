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
  export default {
    data() {
      return {
        movies: [],
        page: 1,
        loading: false,
        showTopButton: false,
      };
    },
    methods: {
      fetchMovies() {
        this.loading = true;
        setTimeout(() => {
          const newMovies = Array.from({ length: 10 }, (_, i) => ({
            title: `Movie ${(this.page - 1) * 10 + i + 1}`,
          }));
          this.movies = [...this.movies, ...newMovies];
          this.loading = false;
        }, 1000);
      },
      handleScroll() {
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100
        ) {
          this.page++;
          this.fetchMovies();
        }
        this.showTopButton = window.scrollY > 300;
      },
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
  