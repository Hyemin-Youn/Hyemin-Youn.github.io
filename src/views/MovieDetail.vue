<template>
    <div
v-if="movie"
class="movie-detail"
>
      <img
:src="makeImagePath(movie.backdrop_path, 'w1280')"
alt="Movie Background"
>
      <div class="content">
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.overview }}</p>
        <p>개봉일: {{ movie.release_date }}</p>
        <p>평점: ⭐ {{ movie.vote_average }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        movie: null,
      };
    },
    created() {
      this.fetchMovieDetail();
    },
    methods: {
      async fetchMovieDetail() {
        const API_KEY = process.env.VUE_APP_API_KEY;
        const movieId = this.$route.params.id;
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
          );
          this.movie = response.data;
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      },
      makeImagePath(path, size) {
        return `https://image.tmdb.org/t/p/${size}${path}`;
      },
    },
  };
  </script>
  
  <style scoped>
  .movie-detail {
    position: relative;
    color: white;
    text-align: center;
  }
  
  .movie-detail img {
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    border-radius: 10px;
  }
  
  .content {
    padding: 20px;
  }
  </style>
  