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
      <h1>대세 콘텐츠</h1>

      <!-- 영화 리스트 -->
      <div
        class="movie-grid"
        :class="{ 'table-view': viewMode === 'table' }"
        :style="gridStyle"
      >
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
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* 기본 View 크기 */
  gap: 20px;
}

.movie-grid.table-view {
  grid-template-columns: repeat(5, 1fr); /* Table View에서 고정된 열 크기 */
  gap: 10px;
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
