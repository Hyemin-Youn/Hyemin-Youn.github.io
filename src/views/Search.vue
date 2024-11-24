<template>
    <div class="search-page">
      <!-- Navbar -->
      <Navbar />
  
      <!-- Main Content -->
      <div class="content">
        <h1>영화 검색</h1>
  
        <!-- 검색 필터 -->
        <div class="dropdown-container">
          <label>선호하는 설정을 선택하세요</label>
          <div v-for="dropdown in dropdownEntries" :key="dropdown.key" class="custom-select">
            <div class="select-selected" @click="toggleDropdown(dropdown.key)">
              {{ selectedOptions[dropdown.key] }}
            </div>
            <div v-if="activeDropdown === dropdown.key" class="select-items">
              <div v-for="option in dropdown.options" :key="option" @click="selectOption(dropdown.key, option)">
                {{ option }}
              </div>
            </div>
          </div>
          <button class="clear-options" @click="clearOptions">초기화</button>
        </div>
  
        <!-- 영화 리스트 -->
        <div v-if="movies.length > 0" class="movie-grid">
          <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
        </div>
        <div v-else class="no-results">검색 결과가 없습니다.</div>
  
        <!-- 로딩 표시 -->
        <div v-if="loading" class="loading">로딩 중...</div>
  
        <!-- Pagination -->
        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @change-page="fetchMovies"
        />
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from "@/components/Navbar.vue";
  import MovieCard from "@/components/MovieCard.vue";
  import Pagination from "@/components/Pagination.vue";
  import { fetchMovies } from "@/api/movies";
  
  export default {
    name: "Search",
    components: {
      Navbar,
      MovieCard,
      Pagination,
    },
    data() {
      return {
        movies: [], // 영화 데이터를 저장
        currentPage: 1,
        totalPages: 1,
        loading: false, // 로딩 상태
        selectedOptions: {
          originalLanguage: "장르 (전체)",
          translationLanguage: "평점 (전체)",
          sorting: "언어 (전체)",
        },
        activeDropdown: null,
      };
    },
    computed: {
      dropdownEntries() {
        return [
          { key: "originalLanguage", options: ["장르 (전체)", "Action", "Comedy", "Drama"] },
          { key: "translationLanguage", options: ["평점 (전체)", "9~10", "8~9", "7~8"] },
          { key: "sorting", options: ["언어 (전체)", "en", "ko"] },
        ];
      },
    },
    methods: {
      async fetchMovies(page = 1) {
        this.loading = true; // 로딩 시작
        const genreMap = {
          "Action": 28,
          "Comedy": 35,
          "Drama": 18,
        };
  
        const filters = {
          genre: genreMap[this.selectedOptions.originalLanguage] || null,
          ratingMin:
            this.selectedOptions.translationLanguage !== "평점 (전체)"
              ? parseFloat(this.selectedOptions.translationLanguage.split("~")[0])
              : null,
          ratingMax:
            this.selectedOptions.translationLanguage !== "평점 (전체)"
              ? parseFloat(this.selectedOptions.translationLanguage.split("~")[1])
              : null,
          language:
            this.selectedOptions.sorting !== "언어 (전체)"
              ? this.selectedOptions.sorting
              : null,
          page,
        };
  
        const data = await fetchMovies(filters); // API 호출
        this.movies = data.results || [];
        this.totalPages = data.total_pages || 1;
        this.currentPage = page;
        this.loading = false; // 로딩 종료
      },
      toggleDropdown(key) {
        this.activeDropdown = this.activeDropdown === key ? null : key;
      },
      selectOption(key, option) {
        this.selectedOptions[key] = option;
        this.fetchMovies(1); // 첫 페이지부터 다시 로드
      },
      clearOptions() {
        this.selectedOptions = {
          originalLanguage: "장르 (전체)",
          translationLanguage: "평점 (전체)",
          sorting: "언어 (전체)",
        };
        this.fetchMovies(1); // 필터 초기화 후 데이터 다시 로드
      },
    },
    created() {
      this.fetchMovies(); // 첫 페이지 데이터 로드
    },
  };
  </script>
  
  <style scoped>
  .search-page {
    background-color: #121212;
    color: white;
    min-height: 100vh;
  }
  
  .content {
    padding: 20px;
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
  }
  
  .no-results {
    text-align: center;
    color: white;
    font-size: 18px;
    margin-top: 20px;
  }
  
  .loading {
    text-align: center;
    margin-top: 20px;
    color: white;
  }
  </style>
  