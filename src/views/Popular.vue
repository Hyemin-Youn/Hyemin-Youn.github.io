<template>
  <div class="popular" :class="{ 'no-scroll': viewMode === 'table' }">
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

      <!-- Loading Spinner -->
      <div v-if="loading && viewMode === 'infinite'" class="loading">
        로딩 중...
      </div>

      <!-- 맨 위로 올라가기 버튼 -->
      <button v-if="showScrollTopButton && viewMode === 'infinite'" class="scroll-top" @click="scrollToTop">
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
      movies: [],
      currentPage: 1,
      totalPages: 1,
      viewMode: "table", // 현재 View 모드 ('table' 또는 'infinite')
      loading: false,
      showScrollTopButton: false, // 스크롤 상단 버튼 표시 여부
    };
  },
  methods: {
    async fetchMovies(page = 1, append = false) {
      if (this.loading) return;
      this.loading = true;

      const data = await fetchPopularMovies(page);

      if (append) {
        this.movies = [...this.movies, ...data.results];
      } else {
        this.movies = data.results;
      }

      this.currentPage = page;
      this.totalPages = data.total_pages;
      this.loading = false;
    },
    changeViewMode(mode) {
      this.viewMode = mode;
      this.movies = [];
      this.currentPage = 1;
      this.fetchMovies();
    },
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
/* 기본 레이아웃 */
.popular {
  padding: 20px;
  background-color: #121212;
  color: #fff;
  min-height: 100vh;
  overflow-y: auto; /* 기본적으로 스크롤 가능 */
}

/* Table View에서 스크롤 제거 */
.no-scroll {
  height: 100vh;
  overflow: hidden; /* 스크롤 완전 제거 */
}

/* View Toggle 버튼 스타일 */
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

/* 영화 카드 그리드 */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

/* Pagination 컴포넌트 스타일 */
.loading {
  text-align: center;
  margin: 20px 0;
  color: white;
}

/* 맨 위로 버튼 스타일 */
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
</style>
