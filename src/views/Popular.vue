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
        <MovieCard v-for="movie in displayedMovies" :key="movie.id" :movie="movie" />
      </div>

      <!-- Pagination (Table View 전용) -->
      <div v-if="viewMode === 'table'" class="pagination">
        <button @click="changePage(page)" :class="{ active: currentPage === page }" v-for="page in totalPages" :key="page">
          {{ page }}
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
      totalPages: 10, // 최대 10페이지로 제한
      viewMode: "table", // 기본 View 모드
      loading: false,
      showScrollTopButton: false,
      moviesPerPage: 10, // 한 페이지에 표시할 영화 개수
    };
  },
  computed: {
    displayedMovies() {
      if (this.viewMode === "table") {
        const start = (this.currentPage - 1) * this.moviesPerPage;
        const end = start + this.moviesPerPage;
        return this.movies.slice(start, end);
      }
      return this.movies;
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

      this.loading = false;
    },
    changeViewMode(mode) {
      this.viewMode = mode;

      if (mode === "table") {
        document.body.style.overflow = "hidden";
        this.currentPage = 1; // 테이블 뷰에 맞게 초기화
      } else {
        document.body.style.overflow = "auto";
        this.fetchMovies(1, true); // 무한 스크롤 초기화
      }
    },
    changePage(page) {
      this.currentPage = page;
    },
    handleScroll() {
      if (this.viewMode === "infinite") {
        const bottomOfWindow =
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

        if (bottomOfWindow && !this.loading) {
          this.fetchMovies(this.currentPage + 1, true); // 다음 페이지 데이터 로드
          this.currentPage++;
        }
      }
      this.showScrollTopButton = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  created() {
    this.fetchMovies(); // 초기 데이터 로드
    window.addEventListener("scroll", this.handleScroll); // 스크롤 이벤트 등록
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll); // 스크롤 이벤트 해제
  },
};
</script>

<style scoped>
/* Navbar 고정 */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

/* 전체 페이지 스타일 */
.popular {
  padding-top: 60px; /* Navbar 높이만큼 패딩 추가 */
  background-color: #121212;
  color: #fff;
  min-height: 100vh;
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
  grid-template-columns: repeat(5, 1fr); /* 고정 열 */
  gap: 20px;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.pagination button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 4px;
}

.pagination button.active {
  background-color: #e50914;
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
</style>
