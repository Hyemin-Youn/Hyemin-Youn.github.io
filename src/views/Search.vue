<template>
    <div class="search-page">
      <h1>영화 검색</h1>
      <div class="dropdown-container">
        <label>선호하는 설정을 선택하세요</label>
        <div
          v-for="dropdown in dropdownEntries"
          :key="dropdown.key"
          class="custom-select"
        >
          <div
            class="select-selected"
            @click="toggleDropdown(dropdown.key)"
          >
            {{ selectedOptions[dropdown.key] }}
          </div>
          <div
            v-if="activeDropdown === dropdown.key"
            class="select-items"
          >
            <div
              v-for="option in dropdown.options"
              :key="option"
              @click="selectOption(dropdown.key, option)"
            >
              {{ option }}
            </div>
          </div>
        </div>
        <button class="clear-options" @click="clearOptions">초기화</button>
      </div>
  
      <!-- 영화 목록 -->
      <div class="movie-grid">
        <div
          class="movie-card"
          v-for="movie in movies"
          :key="movie.id"
        >
          <img
            class="movie-poster"
            :src="getPosterUrl(movie.poster_path)"
            :alt="movie.title"
          />
          <div class="movie-title">{{ movie.title }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { fetchMovies } from "@/api/movies";
  
  export default {
    name: "Search",
    data() {
      return {
        dropdowns: {
          originalLanguage: ["장르 (전체)", "Action", "Adventure", "Comedy", "Crime", "Family"],
          translationLanguage: ["평점 (전체)", "9~10", "8~9", "7~8", "6~7", "5~6", "4~5", "4점 이하"],
          sorting: ["언어 (전체)", "en", "ko"],
        },
        DEFAULT_OPTIONS: {
          originalLanguage: "장르 (전체)",
          translationLanguage: "평점 (전체)",
          sorting: "언어 (전체)",
        },
        selectedOptions: {
          originalLanguage: "장르 (전체)",
          translationLanguage: "평점 (전체)",
          sorting: "언어 (전체)",
        },
        activeDropdown: null,
        movies: [],
      };
    },
    computed: {
      dropdownEntries() {
        return Object.entries(this.dropdowns).map(([key, options]) => ({
          key,
          options,
        }));
      },
    },
    methods: {
      async fetchMovies() {
        const filters = {
          genre: this.selectedOptions.originalLanguage,
          rating: this.selectedOptions.translationLanguage,
          language: this.selectedOptions.sorting,
        };
        this.movies = await fetchMovies(filters);
      },
      toggleDropdown(key) {
        this.activeDropdown = this.activeDropdown === key ? null : key;
      },
      selectOption(key, option) {
        this.selectedOptions = {
          ...this.selectedOptions,
          [key]: option,
        };
        this.activeDropdown = null;
        this.fetchMovies(); // 옵션 변경 시 영화 검색
      },
      clearOptions() {
        this.selectedOptions = { ...this.DEFAULT_OPTIONS };
        this.fetchMovies(); // 초기화 후 영화 검색
      },
      getPosterUrl(path) {
        return `https://image.tmdb.org/t/p/w500/${path}`;
      },
    },
    created() {
      this.fetchMovies(); // 페이지 로드 시 초기 영화 목록 가져오기
    },
  };
  </script>
  
  <style scoped>
  .search-page {
    padding: 20px;
    color: white;
    background-color: #121212;
  }
  
  .dropdown-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .custom-select {
    position: relative;
    display: inline-block;
    min-width: 150px;
  }
  
  .select-selected {
    background-color: black;
    color: white;
    padding: 10px;
    border: 1px solid #fff;
    cursor: pointer;
  }
  
  .select-items {
    position: absolute;
    background-color: #333;
    border: 1px solid #fff;
    z-index: 99;
    width: 100%;
  }
  
  .select-items div {
    padding: 10px;
    cursor: pointer;
  }
  
  .select-items div:hover {
    background-color: #575757;
  }
  
  .clear-options {
    background-color: black;
    color: white;
    padding: 10px;
    border: 1px solid #fff;
    cursor: pointer;
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
    color: white;
    font-size: 14px;
  }
  </style>
  