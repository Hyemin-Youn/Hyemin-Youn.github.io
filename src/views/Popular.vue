<template>
  <div :class="['popular', { 'disable-scroll': viewMode === 'table' }]">
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
      <!-- 영화 리스트 -->
      <div
        class="movie-grid"
        :class="{ 'table-view': viewMode === 'table' }"
      >
        <MovieCard v-for="movie in paginatedMovies" :key="movie.id" :movie="movie" />
      </div>

      <!-- Pagination (Table View 전용) -->
      <Pagination
        v-if="viewMode === 'table'"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @change-page="fetchMovies"
      />

      <!-- Loading Spinner -->
      <div v-if="loading && viewMode === 'infinite'" class="loading">
        로딩 중...
      </div>

      <!-- 맨 위로 올라가기 버튼 -->
      <button v-if="showScrollTopButton" class="scroll-top" @click="scrollToTop">
        TOP(위로)
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
      movies: [],
      currentPage: 1,
      totalPages: 1,
      viewMode: "table", // 기본 View 모드
      loading: false,
      showScrollTopButton: false,
      moviesPerPage: 10, // 한 페이지에 표시할 영화 개수
    };
  },
  computed: {
    paginatedMovies() {
      const start = (this.currentPage - 1) * this.moviesPerPage;
      const end = start + this.moviesPerPage;
      return this.movies.slice(start, end);
    },
  },
  methods: {
    async fetchMovies(page = 1) {
      if (this.loading) return;

      this.loading = true;
      const data = await fetchPopularMovies(page);

      this.movies = data.results;
      this.currentPage = page;
      this.totalPages = Math.ceil(data.results.length / this.moviesPerPage); // 페이지 수 계산
      this.loading = false;
    },
    changeViewMode(mode) {
      this.viewMode = mode;

      if (mode === "table") {
        // 스크롤바 제거
        document.body.style.overflow = "hidden";
        this.currentPage = 1; // 테이블 뷰에 맞게 초기화
      } else {
        // Infinite Scroll에서 스크롤바 활성화
        document.body.style.overflow = "auto";
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  created() {
    this.fetchMovies(); // 초기 데이터 로드
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
  grid-template-columns: repeat(5, 1fr); /* 고정 열 크기 */
  grid-template-rows: repeat(2, 1fr); /* Table View에서 2줄만 표시 */
  gap: 20px;
}

.movie-grid.table-view {
  height: calc(100vh - 150px); /* 헤더와 버튼의 높이를 제외한 나머지 */
  overflow: hidden;
}

.loading {
  text-align: center;
  margin: 20px 0;
  color: white;
}

.scroll-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #e50914;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.disable-scroll {
  overflow: hidden; /* Table View에서 스크롤 제거 */
}
</style>
