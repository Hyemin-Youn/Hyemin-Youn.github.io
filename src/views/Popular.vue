<template>
  <div :class="['popular', { 'disable-scroll': viewMode === 'table' }]">
    <!-- Navbar -->
    <Navbar class="navbar" />

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
      <div class="movie-grid" :class="{ 'table-view': viewMode === 'table' }">
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
      containerHeight: 0, // 동적 높이 계산
    };
  },
  computed: {
    gridStyle() {
      if (this.viewMode === "table") {
        return {
          height: `${this.containerHeight}px`,
          overflow: "hidden",
        };
      }
      return {};
    },
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

      if (this.viewMode === "table") {
        this.calculateContainerHeight();
      }
    },
    changeViewMode(mode) {
      this.viewMode = mode;

      if (mode === "table") {
        // 스크롤바 제거 및 동적 높이 계산
        document.body.style.overflow = "hidden";
        this.movies = [];
        this.currentPage = 1;
        this.fetchMovies();
      } else {
        // Infinite Scroll에서 스크롤바 활성화
        document.body.style.overflow = "auto";
      }
    },
    calculateContainerHeight() {
      const rowHeight = 150; // 각 영화 카드의 높이
      const gap = 20; // 카드 간 간격
      const rows = Math.ceil(this.movies.length / 5); // 가로 5개씩 배치
      this.containerHeight = rows * (rowHeight + gap) - gap; // 전체 높이 계산
    },
    handleScroll() {
      if (this.viewMode !== "infinite") return;

      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (bottomOfWindow && this.currentPage < this.totalPages) {
        this.fetchMovies(this.currentPage + 1, true); // 다음 페이지 데이터 로드
      }

      this.showScrollTopButton = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  created() {
    this.fetchMovies(); // 초기 데이터 로드
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
/* Navbar 고정 및 화면 상단에 딱 붙이기 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #121212; /* 배경색 추가 */
  border-bottom: 1px solid #333; /* 하단 구분선 추가 */
}

/* 전체 페이지 스타일 */
.popular {
  padding-top: 60px; /* Navbar 높이만큼 패딩 추가 */
  background-color: #121212;
  color: #fff;
  min-height: 100vh;
}

/* 스크롤 제거 */
.disable-scroll {
  overflow: hidden;
}

/* 뷰 전환 버튼 */
.view-toggle {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.view-toggle button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 4px;
}

.view-toggle button.active {
  background-color: #e50914;
}

/* 영화 그리드 */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* 기본 View 크기 */
  gap: 20px;
  padding: 20px;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
</style>
