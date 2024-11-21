<template>
    <div>
      <Navbar />
      <div class="movie-details">
        <img
          :src="'https://image.tmdb.org/t/p/original' + movie.backdrop_path"
          alt="Movie Poster"
          class="movie-banner"
        />
        <div class="movie-content">
          <h1>{{ movie.title }}</h1>
          <p>{{ movie.overview }}</p>
          <p>평점: ⭐ {{ movie.vote_average }}</p>
          <p>개봉일: {{ movie.release_date }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from "@/components/Navbar.vue";
  import axios from "axios";
  
  export default {
    name: "MovieDetails",
    components: {
      Navbar,
    },
    data() {
      return {
        movie: {},
      };
    },
    created() {
      const movieId = this.$route.params.id;
      this.fetchMovieDetails(movieId);
    },
    methods: {
      async fetchMovieDetails(id) {
        const API_KEY = process.env.VUE_APP_API_KEY;
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`
          );
          this.movie = response.data;
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .movie-details {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .movie-banner {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  .movie-content {
    max-width: 800px;
    text-align: center;
    padding: 20px;
  }
  </style>
  