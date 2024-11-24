<template>
  <div class="search-page" @scroll="handleScroll">
    <!-- Navbar -->
    <Navbar />

    <!-- 검색 기능 및 영화 리스트 -->
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
      currentPage: 1, // 현재 페이지
      totalPages: 1, // 총 페이지 수
      loading: false, // 로딩 상태
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
      if (this.loading) return; // 중복 호출 방지
      this.loading = true;

      const filters = {
        genre: this.selectedOptions.originalLanguage,
        rating: this.selectedOptions.translationLanguage,
        language: this.selectedOptions.sorting,
        page,
      };

      const data = await fetchMovies(filters);

      if (append) {
        this.movies = [...this.movies, ...data.results]; // 추가 데이터를 기존 리스트에 결합
      } else {
        this.movies = data.results; // 새 데이터를 덮어쓰기
      }

      this.currentPage = page;
      this.totalPages = data.total_pages;
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
      this.fetchMovies(1); // 옵션 변경 시 첫 페이지로 데이터 갱신
    },
    clearOptions() {
      this.selectedOptions = { ...this.DEFAULT_OPTIONS };
      this.fetchMovies(1); // 초기화 후 첫 페이지로 데이터 갱신
    },
    getPosterUrl(path) {
      return `https://image.tmdb.org/t/p/w500/${path}`;
    },
    handleScroll() {
      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (bottomOfWindow && this.currentPage < this.totalPages) {
        this.fetchMovies(this.currentPage + 1, true); // 다음 페이지 데이터 로드
      }
    },
  },
  created() {
    this.fetchMovies(); // 초기 데이터 로드
    window.addEventListener("scroll", this.handleScroll); // 스크롤 이벤트 리스너 추가
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll); // 컴포넌트 제거 시 스크롤 이벤트 리스너 제거
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
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); /* 최소 크기를 줄여 한 행에 더 많은 카드 표시 */
  gap: 10px; /* 카드 간격 */
}

.movie-card {
  text-align: center;
  background-color: #1e1e1e;
  padding: 5px;
  border-radius: 8px;
}

.movie-poster {
  width: 100%;
  height: 200px; /* 고정 높이 설정 */
  border-radius: 8px;
  margin-bottom: 5px;
  object-fit: cover; /* 이미지 비율 유지 */
}

.movie-title {
  font-size: 12px; /* 텍스트 크기 조정 */
  color: white;
  overflow: hidden; /* 긴 제목 잘림 처리 */
  white-space: nowrap;
  text-overflow: ellipsis;
}

.loading {
  text-align: center;
  color: white;
  margin: 20px 0;
}
</style>
