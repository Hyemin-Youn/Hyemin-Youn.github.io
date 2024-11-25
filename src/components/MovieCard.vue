<template>
    <div class="movie-card">
      <img :src="posterUrl" :alt="movie.title" class="poster" />
      <p class="title">{{ movie.title }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      movie: {
        type: Object,
        required: true,
      },
    },
    computed: {
      posterUrl() {
        return `https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`;
      },
    },
  };
  </script>
  
  <style scoped>
  .movie-card {
    text-align: center;
    margin: 10px;
  }
  .poster {
    width: 100%;
    border-radius: 8px;
  }
  .title {
    font-size: 14px;
    margin-top: 8px;
  }
  </style>
  