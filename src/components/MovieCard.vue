<template> 
    <div class="movie-card" @click="goToDetail"> 
      <img :src="movie.poster" alt="Movie Poster" /> 
      <h3>{{ movie.title }}</h3> 
    </div> 
  </template> 
   
  <script> 
  export default { 
    props: ['movie'], 
    methods: { 
      goToDetail() { 
        this.$router.push(`/movie/${this.movie.id}`); 
      }, 
    }, 
  }; 
  </script> 
   
  <style scoped> 
  .movie-card { 
    cursor: pointer; 
  } 
  </style> 