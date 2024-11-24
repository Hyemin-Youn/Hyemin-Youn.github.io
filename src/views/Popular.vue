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
      <!-- 영화 리스트 -->
      <div class="movie-grid">
        <MovieCard
          v-for="movie in paginatedMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>

      <!-- Pagination for Table View -->
      <div
        v-if="viewMode === 'table'"
        class="pagination"
      >
        <button @click="changePage('prev')" :disabled="currentPage === 1">
          이전
        </button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="changePage('next')"
          :disabled="currentPage === totalPages"
        >
          다음
        </button>
      </div>

      <!-- Loading Spinner for Infinite Scroll -->
      <div v-if="loading && viewMode === 'infinite'" class="loading">
        로딩 중...
      </div>
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
      movies: [], // 모든 영화 데이터
      currentPage: 1, // 현재 페이지
      itemsPerPage: 9, // 한 페이지에 표시할 영화 수
      totalPages: 1, // 전체 페이지 수
      viewMode: "table", // 현재 View 모드 ('table' 또는 'infinite')
      loading: false, // 무한 스크롤 로딩 상태
    };
  },
  computed: {
    // Table View: 현재 페이지에 해당하는 영화 목록
    paginatedMovies() {
      if (this.viewMode === "table") {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.movies.slice(startIndex, endIndex);
      }
      return this.movies; // Infinite View: 모든 영화 데이터
    },
  },
  methods: {
    async fetchMovies(page = 1, append = false) {
      if (this.loading) return;
      this.loading = true;

      const data = await fetchPopularMovies(page);

      if (append) {
        this.movies = [...this.movies, ...data.results]; // Infinite Scroll: 영화 추가
      } else {
        this.movies = data.results; // Table View: 영화 초기화
      }

      this.totalPages = Math.ceil(this.movies.length / this.itemsPerPage); // 총 페이지 계산
      this.loading = false;
    },
    changePage(direction) {
      if (direction === "prev" && this.currentPage > 1) {
        this.currentPage--;
      } else if (direction === "next" && this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    changeViewMode(mode) {
      this.viewMode = mode;
      if (mode === "table") {
        document.body.style.overflowY = "hidden"; // Table View: 스크롤 제거
        this.currentPage = 1; // 페이지 초기화
        this.fetchMovies(); // 영화 데이터 로드
      } else {
        document.body.style.overflowY = "auto"; // Infinite Scroll: 스크롤 복원
        this.fetchMovies(); // 영화 데이터 로드
      }
    },
    handleScroll() {
      if (this.viewMode !== "infinite") return; // Infinite Scroll 모드가 아니면 종료

      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (bottomOfWindow) {
        this.fetchMovies(this.currentPage + 1, true); // 다음 페이지 로드
      }
    },
  },
  created() {
    this.fetchMovies(); // 초기 데이터 로드
    window.addEventListener("scroll", this.handleScroll); // 무한 스크롤 이벤트 등록
    document.body.style.overflowY = "hidden"; // 초기 Table View 스크롤 제거
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll); // 이벤트 해제
    document.body.style.overflowY = "auto"; // 스크롤 상태 복원
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
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  justify-items: center;
  align-items: center;
  height: calc(100vh - 100px); /* 전체 높이에서 상단과 하단 여백 제외 */
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:disabled {
  background-color: #555;
  cursor: not-allowed;
}

.pagination span {
  color: #fff;
}

.loading {
  text-align: center;
  margin: 20px 0;
  color: white;
}
</style>
