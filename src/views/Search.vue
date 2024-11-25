<template>
  <div class="search-page" @scroll="handleScroll">
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
      movies: [], // 영화 데이터를 저장
      currentPage: 1, // 현재 페이지
      totalPages: 1, // 총 페이지 수
      loading: false, // 로딩 상태
      isFetching: false, // 중복 요청 방지
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
    async fetchMovies(page = 1, append = false) {
      if (this.isFetching || (page > this.totalPages && !append)) return; // 중복 요청 방지 및 페이지 초과 방지
      this.isFetching = true;
      this.loading = true;

      const filters = {
        genre: this.selectedOptions.originalLanguage,
        rating: this.selectedOptions.translationLanguage,
        language: this.selectedOptions.sorting,
        page,
      };

      const data = await fetchMovies(filters);

      if (append) {
        this.movies = [...this.movies, ...data.results]; // 기존 데이터에 추가
      } else {
        this.movies = data.results; // 새 데이터로 대체
      }

      this.currentPage = page;
      this.totalPages = data.total_pages || 10; // 기본 페이지 수 설정
      this.loading = false;
      this.isFetching = false;
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
      this.fetchMovies(1); // 옵션 변경 시 첫 페이지부터 다시 로드
    },
    clearOptions() {
      this.selectedOptions = { ...this.DEFAULT_OPTIONS };
      this.fetchMovies(1); // 옵션 초기화 후 첫 페이지부터 다시 로드
    },
    handleScroll() {
      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 50;

      if (bottomOfWindow && this.currentPage < this.totalPages) {
        this.fetchMovies(this.currentPage + 1, true); // 다음 페이지 데이터 로드
      }
    },
    getPosterUrl(path) {
      return `https://image.tmdb.org/t/p/w500/${path}`;
    },
  },
  created() {
    this.fetchMovies(); // 초기 데이터 로드
    window.addEventListener("scroll", this.handleScroll); // 스크롤 이벤트 추가
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll); // 이벤트 제거
  },
};
</script>

<style scoped>
.search-page {
  background-color: #121212;
  color: white;
  min-height: 100vh;
  overflow-y: auto; /* 스크롤 활성화 */
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
  height: 200px;
  border-radius: 8px;
  margin-bottom: 10px;
  object-fit: cover;
}

.movie-title {
  font-size: 14px;
  color: white;
}

.loading {
  text-align: center;
  margin: 20px 0;
}

.movie-card:hover {
  transform: scale(1.05);
}
</style>
