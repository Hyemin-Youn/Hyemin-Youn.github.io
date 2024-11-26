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
      <div
        class="movie-grid"
        :class="{ 'table-view': viewMode === 'table' }"
        :style="gridStyle"
      >
        <MovieCard v-for="movie in paginatedMovies" :key="movie.id" :movie="movie" />
      </div>

      <!-- Pagination (Table View 전용) -->
      <div v-if="viewMode === 'table'" class="pagination">
        <button
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          이전
        </button>
        <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          다음
        </button>
      </div>

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
import { fetchPopularMovies } from "../api/movies";

export default {
  name: "Popular",
  components: {
    Navbar,
    MovieCard,
  },
  data() {
    return {
      movies: [],
      currentPage: 1,
      totalPages: 1,
      viewMode: "table", // 기본 View 모드
      loading: false,
      showScrollTopButton: false,
      moviesPerPage: 8, // 한 페이지에 표시할 영화 개수
    };
  },
  computed: {
    paginatedMovies() {
      const start = (this.currentPage - 1) * this.moviesPerPage;
      const end = start + this.moviesPerPage;
      return this.movies.slice(start, end);
    },
    gridStyle() {
      if (this.viewMode === "table") {
        return {
          gridTemplateColumns: "repeat(4, 1fr)", // 테이블 뷰에서 4열 고정
          gridAutoRows: "auto",
          height: "auto", // 모든 내용 표시
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
      this.totalPages = Math.ceil(this.movies.length / this.moviesPerPage);
      this.loading = false;
    },
    changeViewMode(mode) {
      this.viewMode = mode;

      if (mode === "table") {
        document.body.style.overflow = "hidden"; // 스크롤 비활성화
        this.currentPage = 1; // 페이지 초기화
      } else {
        document.body.style.overflow = "auto"; // 스크롤 활성화
      }
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
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
  gap: 20px;
  padding: 20px;
}

.movie-grid.table-view {
  grid-template-columns: repeat(4, 1fr); /* 테이블 뷰에서 고정 열 크기 */
  gap: 20px;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.pagination button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #666;
  cursor: not-allowed;
}

.pagination span {
  color: #fff;
  margin: 0 10px;
}

/* Loading */
.loading {
  text-align: center;
  margin: 20px 0;
  color: white;
}

/* TOP 버튼 */
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

.scroll-top:hover {
  background-color: #b00610;
}
</style>
