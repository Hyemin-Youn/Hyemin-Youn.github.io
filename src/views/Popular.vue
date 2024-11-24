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
      movies: [], // 영화 데이터
      currentPage: 1,
      totalPages: 1,
      viewMode: "table", // 현재 View 모드 ('table' 또는 'infinite')
      loading: false,
    };
  },
  methods: {
    async fetchMovies(page = 1) {
      const data = await fetchPopularMovies(page);
      this.movies = data.results;
      this.currentPage = page;
      this.totalPages = data.total_pages;
    },
    changeViewMode(mode) {
      this.viewMode = mode;
      this.movies = [];
      this.currentPage = 1;
      this.fetchMovies();
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
  height: 100vh; /* 전체 화면 높이 */
  overflow: hidden; /* 스크롤 제거 */
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); /* 열의 수 조정 */
  gap: 10px;
  justify-items: center; /* 그리드 아이템 가운데 정렬 */
  height: calc(100vh - 150px); /* 페이지 상단과 하단 여백을 제외한 높이 */
  overflow: hidden;
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

.loading {
  text-align: center;
  margin: 20px 0;
  color: white;
}
</style>
