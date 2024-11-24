<template>
  <div class="popular" :style="{ overflow: 'hidden' }">
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

      <!-- Pagination -->
      <div class="pagination">
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
    };
  },
  computed: {
    // 현재 페이지에 해당하는 영화 목록
    paginatedMovies() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.movies.slice(startIndex, endIndex);
    },
  },
  methods: {
    async fetchMovies() {
      const data = await fetchPopularMovies(); // 모든 영화 데이터를 불러옵니다
      this.movies = data.results;
      this.totalPages = Math.ceil(this.movies.length / this.itemsPerPage); // 페이지 수 계산
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
        document.body.style.overflow = "hidden"; // 스크롤 비활성화
      } else {
        document.body.style.overflow = ""; // 스크롤 활성화
      }
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
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* 열 개수 자동 조정 */
  gap: 20px;
  justify-items: center;
  align-items: center;
  height: calc(100vh - 100px); /* 전체 높이 - 상단/하단 여백 */
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
</style>
