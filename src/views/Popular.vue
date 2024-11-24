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

      <!-- Table View -->
      <div v-if="viewMode === 'table'" class="movie-grid">
        <MovieCard v-for="movie in visibleMovies" :key="movie.id" :movie="movie" />
      </div>

      <!-- Infinite Scroll View -->
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
      movies: [],
      currentPage: 1,
      totalPages: 1,
      viewMode: "table",
      loading: false,
      moviesPerPage: 14,
    };
  },
  computed: {
    visibleMovies() {
      const startIndex = (this.currentPage - 1) * this.moviesPerPage;
      const endIndex = startIndex + this.moviesPerPage;
      return this.movies.slice(startIndex, endIndex);
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

      this.totalPages = Math.ceil(data.total_results / this.moviesPerPage);
      this.loading = false;
    },
    changeViewMode(mode) {
      this.viewMode = mode;
      this.currentPage = 1;
      this.fetchMovies();
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  created() {
    this.fetchMovies();
  },
};
</script>


<style scoped>
/* 글로벌 스타일 */
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* 스크롤 막기 */
}

.popular {
  padding: 20px;
  background-color: #121212;
  color: #fff;
  height: 100vh; /* 뷰포트 높이에 맞추기 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* 위아래 공간 조정 */
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%; /* 내용이 전체 높이에 맞도록 */
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7개의 열 */
  grid-template-rows: repeat(2, 1fr); /* 2개의 행 */
  gap: 20px; /* 카드 간격 */
  width: 100%; /* 그리드 너비를 100%로 */
  height: 80%; /* 그리드 높이 조정 */
  justify-items: center; /* 중앙 정렬 */
}

.movie-card {
  width: 150px; /* 카드 너비 고정 */
  height: 220px; /* 카드 높이 고정 */
}

.movie-card img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지 비율 유지 */
}


</style>
