<template>
    <div class="search-container">
      <h1>영화 검색</h1>
      <div class="dropdown-container">
        <label>선호하는 설정을 선택하세요:</label>
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
      </div>
      <button class="clear-options" @click="clearOptions">초기화</button>
  
      <!-- 영화 목록 렌더링 -->
      <div class="movie-list">
        <h2>검색 결과</h2>
        <div v-if="loading">로딩 중...</div>
        <div v-else-if="movies.length === 0">검색 결과가 없습니다.</div>
        <ul>
          <li v-for="movie in movies" :key="movie.id">
            {{ movie.title }}
          </li>
        </ul>
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
          sorting: ["언어 (전체)", "en", "ko"], // 영어(en), 한국어(ko)
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
      async fetchMovies() {
        this.loading = true;
        const filters = {
          genre: this.selectedOptions.originalLanguage,
          rating: this.selectedOptions.translationLanguage,
          language: this.selectedOptions.sorting,
        };
        this.movies = await fetchMovies(filters);
        this.loading = false;
      },
    },
    created() {
      this.fetchMovies(); // 페이지 로드 시 초기 영화 목록 가져오기
    },
  };
  </script>
  
  <style scoped>
  /* 동일한 스타일링 */
  </style>
  