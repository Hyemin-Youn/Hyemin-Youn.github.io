<template>
  <div class="search-page">
    <!-- Navbar -->
    <Navbar />

    <!-- 검색 기능 -->
    <h1>영화 검색</h1>
    <div class="dropdown-container">
      <label>선호하는 설정을 선택하세요</label>
      <div v-for="dropdown in dropdownEntries" :key="dropdown.key" class="custom-select">
        <div class="select-selected" @click="toggleDropdown(dropdown.key)">
          {{ selectedOptions[dropdown.key] }}
        </div>
        <div v-if="activeDropdown === dropdown.key" class="select-items">
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
      <div class="movie-card" v-for="movie in movies" :key="movie.id">
        <img class="movie-poster" :src="getPosterUrl(movie.poster_path)" :alt="movie.title" />
        <div class="movie-title">{{ movie.title }}</div>
      </div>
    </div>
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
  background-color: #121212;
  color: white;
  min-height: 100vh;
  padding: 0 10px; /* 양쪽 여백 추가 */
}

.dropdown-container {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap; /* 화면 크기에 따라 줄바꿈 */
  gap: 15px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* 카드 최소 크기 150px */
  gap: 15px; /* 카드 간격 */
  justify-content: center; /* 가운데 정렬 */
}

.movie-card {
  text-align: center;
  background-color: #1e1e1e;
  padding: 10px;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;
}

.movie-card:hover {
  transform: scale(1.05); /* 호버 시 확대 효과 */
}

.movie-poster {
  width: 100%;
  height: 225px; /* 고정 높이 */
  border-radius: 8px;
  object-fit: cover; /* 이미지 비율 유지 */
  margin-bottom: 10px;
}

.movie-title {
  font-size: 14px;
  color: white;
  overflow: hidden; /* 긴 제목 잘림 처리 */
  white-space: nowrap;
  text-overflow: ellipsis;
}

.clear-options {
  background-color: black;
  color: white;
  border: 1px solid white;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.clear-options:hover {
  background-color: #333;
}
</style>
