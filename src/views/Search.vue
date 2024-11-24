<template>
    <div class="search-page">
      <!-- Navbar -->
      <Navbar />
  
      <!-- Filter Options -->
      <div class="filter-container">
        <h2>선호하는 설정을 선택하세요</h2>
        <div class="dropdown-container">
          <div v-for="(options, key) in dropdowns" :key="key" class="custom-select">
            <div class="select-selected" @click="toggleDropdown(key)">
              {{ selectedOptions[key] }}
            </div>
            <div v-if="activeDropdown === key" class="select-items">
              <div
                v-for="option in options"
                :key="option"
                @click="selectOption(key, option)"
              >
                {{ option }}
              </div>
            </div>
          </div>
          <button class="clear-options" @click="clearOptions">초기화</button>
        </div>
      </div>
  
      <!-- Movie Grid -->
      <div class="movie-grid">
        <MovieCard
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from "@/components/Navbar.vue";
  import MovieCard from "@/components/MovieCard.vue";
  import { fetchMoviesByCategory } from "@/api/movies";
  
  export default {
    name: "Search",
    components: {
      Navbar,
      MovieCard,
    },
    data() {
      return {
        dropdowns: {
          genre: ["장르 (전체)", "액션", "코미디", "드라마"],
          rating: ["평점 (전체)", "9~10", "8~9", "7~8", "6~7", "5~6"],
          language: ["언어 (전체)", "한국어", "영어", "일본어"],
        },
        selectedOptions: {
          genre: "장르 (전체)",
          rating: "평점 (전체)",
          language: "언어 (전체)",
        },
        activeDropdown: null,
        movies: [],
        filteredMovies: [],
      };
    },
    methods: {
      toggleDropdown(key) {
        this.activeDropdown = this.activeDropdown === key ? null : key;
      },
      selectOption(key, option) {
        this.selectedOptions[key] = option;
        this.activeDropdown = null;
        this.filterMovies();
      },
      clearOptions() {
        this.selectedOptions = {
          genre: "장르 (전체)",
          rating: "평점 (전체)",
          language: "언어 (전체)",
        };
        this.filterMovies();
      },
      async fetchMovies() {
        const data = await fetchMoviesByCategory();
        this.movies = data.results;
        this.filteredMovies = data.results;
      },
      filterMovies() {
        this.filteredMovies = this.movies.filter((movie) => {
          const matchesGenre =
            this.selectedOptions.genre === "장르 (전체)" ||
            movie.genre.includes(this.selectedOptions.genre);
          const matchesRating =
            this.selectedOptions.rating === "평점 (전체)" ||
            this.filterByRating(movie.vote_average);
          const matchesLanguage =
            this.selectedOptions.language === "언어 (전체)" ||
            movie.original_language === this.selectedOptions.language;
          return matchesGenre && matchesRating && matchesLanguage;
        });
      },
      filterByRating(vote) {
        const range = this.selectedOptions.rating.split("~");
        const min = parseFloat(range[0]);
        const max = parseFloat(range[1]);
        return vote >= min && vote <= max;
      },
    },
    created() {
      this.fetchMovies();
    },
  };
  </script>

  <style scoped>
  .search-page {
    background-color: #121212;
    color: white;
    min-height: 100vh;
  }
  
  .dropdown-container {
    margin: 20px 0;
    display: flex;
    gap: 15px;
  }
  
  .movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
  }
  
  .movie-card {
    text-align: center;
    background-color: #1e1e1e;
    padding: 10px;
    border-radius: 8px;
  }
  
  .movie-poster {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  
  .movie-title {
    font-size: 14px;
    color: white;
  }
    .loading {
    text-align: center;
    color: white;
    margin: 20px 0;
  }
  </style>
  