<template>
    <div class="search-page">
      <!-- Navbar -->
      <Navbar />
  
      <!-- 검색 기능 -->
      <h1>영화 검색</h1>
      <div class="dropdown-container">
        <label>선호하는 설정을 선택하세요</label>
        <div
          v-for="dropdown in dropdownEntries"
          :key="dropdown.key"
          class="custom-select"
        >
          <div class="select-selected" @click="toggleDropdown(dropdown.key)">
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
  
      <!-- 영화 리스트 -->
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
  
      <!-- 페이지 이동 버튼 -->
      <div class="pagination-container">
        <button
          class="pagination-btn"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          이전
        </button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button
          class="pagination-btn"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          다음
        </button>
      </div>
  
      <!-- 로딩 표시 -->
      <div v-if="loading" class="loading">로딩 중...</div>
    </div>
  </template>
  
  <script>
  import Navbar from "@/components/Navbar.vue";
  import { fetchMovies } from "@/api/movies";
  
  export default {
    name: "Search",
    components: {
      Navbar,
    },
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
        currentPage: 1,
        totalPages: 1,
        loading: false,
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
      async fetchMovies(page = 1) {
        this.loading = true;
        const filters = {
          genre: this.selectedOptions.originalLanguage,
          rating: this.selectedOptions.translationLanguage,
          language: this.selectedOptions.sorting,
          page,
        };
  
        const data = await fetchMovies(filters);
  
        this.movies = data;
        this.currentPage = page;
        this.totalPages = Math.ceil(data.length / 20); // 총 페이지 수 계산 (20개 영화 기준)
        this.loading = false;
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
        this.fetchMovies(1); // 옵션 변경 시 첫 페이지 데이터 로드
      },
      clearOptions() {
        this.selectedOptions = { ...this.DEFAULT_OPTIONS };
        this.fetchMovies(1); // 초기화 후 첫 페이지 데이터 로드
      },
      changePage(page) {
        this.fetchMovies(page); // 페이지 변경 시 데이터 로드
      },
      getPosterUrl(path) {
        return `https://image.tmdb.org/t/p/w500/${path}`;
      },
    },
    created() {
      this.fetchMovies(); // 초기 데이터 로드
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
  
  .pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    gap: 10px;
  }
  
  .pagination-btn {
    background-color: #e50914;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .pagination-btn:disabled {
    background-color: #444;
    cursor: not-allowed;
  }
  
  .loading {
    text-align: center;
    color: white;
    margin: 20px 0;
  }
  </style>
  