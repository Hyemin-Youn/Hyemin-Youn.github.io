<template>
  <div class="popular">
    <!-- Navbar -->
    <Navbar />

    <!-- View Toggle Buttons -->
    <div class="view-toggle">
      <button
        :class="{ active: viewMode === 'table' }"
        @click="changeViewMode('table')"
      >
        Table View
      </button>
      <button
        :class="{ active: viewMode === 'infinite' }"
        @click="changeViewMode('infinite')"
      >
        무한 스크롤 View
      </button>
    </div>

    <!-- Main Content -->
    <div class="content">
      <h1>대세 콘텐츠</h1>

      <!-- 영화 리스트 -->
      <div class="movie-grid">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>

      <!-- Pagination (Table View 전용) -->
      <Pagination
        v-if="viewMode === 'table'"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @change-page="fetchMovies"
      />

      <!-- Loading Spinner (Infinite Scroll 전용) -->
      <div v-if="loading && viewMode === 'infinite'" class="loading">
        로딩 중...
      </div>

      <!-- 맨 위로 올라가기 버튼 -->
      <button v-if="showScrollTopButton" class="scroll-top" @click="scrollToTop">
        위로
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MovieCard from "@/components/MovieCard.vue";
import Pagination from "@/components/Pagination.vue";
import { fetchPopularMovies } from "../api/movies";

export default {
  name: "Popular",
  components: {
    Navbar,
    MovieCard,
    Pagination,
  },
  data() {
    return {
      movies: [], // 영화 데이터를 저장하는 배열
      currentPage: 1, // 현재 페이지
      totalPages: 1, // 전체 페이지 수
      viewMode: "table", // 현재 View 모드 ('table' 또는 'infinite')
      loading: false, // 데이터 로딩 상태
      showScrollTopButton: false, // 스크롤 상단 버튼 표시 여부
    };
  },
  methods: {
    // 영화 데이터를 TMDB API에서 가져오는 함수
    async fetchMovies(page = 1, append = false) {
      if (this.loading) return; // 로딩 중일 때 중복 요청 방지
      this.loading = true;

      const data = await fetchPopularMovies(page); // TMDB API 호출

      if (append) {
        this.movies = [...this.movies, ...data.results]; // 추가 데이터 결합
      } else {
        this.movies = data.results; // 새로운 데이터로 대체
      }

      this.currentPage = page; // 현재 페이지 업데이트
      this.totalPages = data.total_pages; // 총 페이지 수 업데이트
      this.loading = false; // 로딩 상태 종료
    },
    // View 모드 변경
    changeViewMode(mode) {
      this.viewMode = mode;
      this.movies = []; // 영화 데이터를 초기화
      this.currentPage = 1; // 첫 페이지부터 다시 로드
      this.fetchMovies(); // 데이터 재로드
    },
    // 무한 스크롤 처리 함수
    handleScroll() {
      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (bottomOfWindow && this.viewMode === "infinite" && this.currentPage < this.totalPages) {
        this.fetchMovies(this.currentPage + 1, true); // 다음 페이지 데이터 로드
      }

      this.showScrollTopButton = window.scrollY > 300; // 스크롤 상단 버튼 표시 여부
    },
    // 페이지 상단으로 스크롤 이동
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  created() {
    this.fetchMovies(); // 초기 데이터 로드
    window.addEventListener("scroll", this.handleScroll); // 스크롤 이벤트 추가
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll); // 스크롤 이벤트 제거
  },
};
</script>

<style scoped>
/* 전체 페이지 스타일 */
html, body {
  margin: 0;
  padding: 0;
  background-color: #121212; /* 기본 배경 색상 */
  color: #fff; /* 텍스트 기본 색상 */
}

#app {
  height: 100%;
}

/* Popular.vue 스타일 */
.popular {
  margin: 0;
  padding: 0;
  background-color: #121212; /* 페이지 배경 */
  min-height: 100vh; /* 화면 전체 높이 */
  display: flex;
  flex-direction: column;
}

.view-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.view-toggle button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 4px;
}

.view-toggle button.active {
  background-color: #e50914;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.loading {
  text-align: center;
  margin: 20px 0;
}

.scroll-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #e50914;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
