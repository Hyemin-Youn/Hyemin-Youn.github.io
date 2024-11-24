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
      <div v-if="viewMode === 'table'" class="movie-grid">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>

      <div v-if="viewMode === 'infinite'" class="movie-grid">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
        <div v-if="loading" class="loading">로딩 중...</div>
      </div>

      <!-- Pagination (Table View 전용) -->
      <div v-if="viewMode === 'table'" class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">&lt; 이전</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">다음 &gt;</button>
      </div>

      <!-- 맨 위로 올라가기 버튼 (무한 스크롤 전용) -->
      <button v-if="viewMode === 'infinite' && showScrollTopButton" class="scroll-top" @click="scrollToTop">
        위로
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MovieCard from "@/components/MovieCard.vue";
import { fetchPopularMovies } from "@/api/movies";

export default {
  name: "Popular",
  components: {
    Navbar,
    MovieCard,
  },
  data() {
    return {
      movies: [], // 영화 데이터
      currentPage: 1, // 현재 페이지
      totalPages: 1, // 총 페이지 수
      viewMode: "table", // 현재 View 모드 ('table' 또는 'infinite')
      loading: false, // 로딩 상태
      showScrollTopButton: false, // 위로 버튼 표시 여부
    };
  },
  methods: {
    // 영화 데이터를 가져오는 함수
    async fetchMovies(page = 1, append = false) {
      if (this.loading) return; // 로딩 중이면 중복 요청 방지
      this.loading = true;

      const data = await fetchPopularMovies(page);

      if (append) {
        this.movies = [...this.movies, ...data.results]; // 데이터 추가
      } else {
        this.movies = data.results; // 데이터 덮어쓰기
      }

      this.currentPage = page;
      this.totalPages = data.total_pages;
      this.loading = false;
    },
    // View 모드 변경
    changeViewMode(mode) {
      this.viewMode = mode;
      this.movies = []; // 기존 데이터 초기화
      this.currentPage = 1; // 첫 페이지부터 다시 시작
      this.fetchMovies(); // 데이터 재로드
    },
    // 이전 페이지 이동 (Table View 전용)
    prevPage() {
      if (this.currentPage > 1) {
        this.fetchMovies(this.currentPage - 1);
      }
    },
    // 다음 페이지 이동 (Table View 전용)
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.fetchMovies(this.currentPage + 1);
      }
    },
    // 스크롤 이벤트 처리 (무한 스크롤 View 전용)
    handleScroll() {
      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (bottomOfWindow && this.viewMode === "infinite" && this.currentPage < this.totalPages) {
        this.fetchMovies(this.currentPage + 1, true);
      }

      this.showScrollTopButton = window.scrollY > 300;
    },
    // 페이지 상단으로 이동
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
.popular {
  padding: 20px;
  background-color: #121212;
  color: #fff;
  min-height: 100vh;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  margin-bottom: 20px;
}

.view-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.view-toggle button {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 4px;
}

.view-toggle button.active {
  background-color: #e50914;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* 카드 크기 */
  gap: 20px;
  width: 100%;
  max-width: 1200px; /* 최대 너비 */
  justify-content: center;
}

.loading {
  text-align: center;
  margin: 20px 0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.scroll-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #e50914;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
