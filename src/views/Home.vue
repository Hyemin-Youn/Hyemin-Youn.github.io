<template>
    <div class="home">
      <h1>Home - Movie List</h1>
      <div class="movie-list">
        <div
          v-for="(movie, index) in movies"
          :key="index"
          class="movie-card"
        >
          <img
            :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
            :alt="movie.title"
            class="movie-poster"
          />
          <h2 class="movie-title">{{ movie.title }}</h2>
          <p class="movie-overview">{{ movie.overview }}</p>
          <p class="movie-rating">Rating: {{ movie.vote_average }}</p>
          <p class="movie-release-date">Release Date: {{ movie.release_date }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "Home",
    data() {
      return {
        movies: []
      };
    },
    created() {
      this.fetchMovies();
    },
    methods: {
      async fetchMovies() {
        const API_KEY = 'YOUR_TMDB_API_KEY';
        const urls = [
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
        ];
  
        try {
          const responses = await Promise.all(urls.map(url => axios.get(url)));
          this.movies = responses.flatMap(response => response.data.results);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .home {
    padding: 20px;
  }
  
  .movie-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .movie-card {
    width: 200px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
  }
  
  .movie-poster {
    width: 100%;
    border-radius: 5px;
  }
  
  .movie-title {
    font-size: 1.2em;
    margin: 10px 0;
  }
  
  .movie-overview {
    font-size: 0.9em;
    color: #666;
  }
  
  .movie-rating,
  .movie-release-date {
    font-size: 0.8em;
    color: #444;
  }
  </style>
  