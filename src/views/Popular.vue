<template>
  <div class="popular">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <div class="content">
      <h1>인기 영화</h1>

      <!-- 영화 리스트 -->
      <div class="movie-grid">
        <div class="movie-card" v-for="movie in visibleMovies" :key="movie.id">
          <img
            class="movie-poster"
            :src="getImageUrl(movie.poster_path)"
            :alt="movie.title"
          />
          <div class="movie-title">{{ movie.title }}</div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button
          class="page-button"
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          이전
        </button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button
          class="page-button"
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { fetchPopularMovies } from "@/api/movies";

export default {
  name: "Popular",
  components: {
    Navbar,
  },
  data() {
    return {
      movies: [], // 전체 영화 데이터
      currentPage: 1, // 현재 페이지
      moviesPerPage: 8, // 한 페이지당 영화 개수
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.movies.length / this.moviesPerPage); // 전체 페이지 수 계산
    },
    visibleMovies() {
      const startIndex = (this.currentPage - 1) * this.moviesPerPage;
      const endIndex = startIndex + this.moviesPerPage;
      return this.movies.slice(startIndex, endIndex); // 현재 페이지에 표시할 영화
    },
  },
  methods: {
    async fetchMovies() {
      const data = await fetchPopularMovies(); // TMDB API 호출
      this.movies = data.results; // 전체 영화 데이터 저장
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--; // 이전 페이지 이동
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++; // 다음 페이지 이동
    },
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`; // 포스터 URL 생성
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
  color: white;
  min-height: 100vh;
}

.content {
  text-align: center;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  justify-items: center;
  margin: 20px auto;
}

.movie-card {
  width: 150px;
  text-align: center;
}

.movie-poster {
  width: 100%;
  border-radius: 8px;
}

.movie-title {
  font-size: 14px;
  margin-top: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.page-button {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 4px;
}

.page-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
