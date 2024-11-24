<template>
  <div class="popular">
    <!-- Navbar -->
    <Navbar />

    <!-- Page Title -->
    <h1 class="page-title">대세 콘텐츠</h1>

    <!-- 영화 리스트 -->
    <div class="movie-grid">
      <div
        v-for="movie in currentMovies"
        :key="movie.id"
        class="movie-card"
      >
        <img :src="getPosterUrl(movie.poster_path)" :alt="movie.title" />
        <div class="movie-title">{{ movie.title }}</div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">&lt; 이전</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">다음 &gt;</button>
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
      movies: [],
      currentPage: 1,
      moviesPerPage: 14, // 한 페이지에 표시할 영화 수
    };
  },
  computed: {
    currentMovies() {
      const start = (this.currentPage - 1) * this.moviesPerPage;
      const end = start + this.moviesPerPage;
      return this.movies.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.movies.length / this.moviesPerPage);
    },
  },
  methods: {
    async fetchMovies() {
      const data = await fetchPopularMovies();
      this.movies = data.results;
    },
    getPosterUrl(path) {
      return `https://image.tmdb.org/t/p/w500/${path}`;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
/* Reset 기본 스타일 제거 */
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* 전체 레이아웃 */
.popular {
  padding: 0; /* 패딩 제거 */
  background-color: #121212;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* 제목 스타일 */
.page-title {
  text-align: center;
  margin: 20px 0;
  font-size: 24px;
}

/* 영화 그리드 */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px; /* 간격 추가 */
  flex-grow: 1;
}

/* 영화 카드 */
.movie-card {
  text-align: center;
  background-color: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.movie-title {
  padding: 10px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 페이지네이션 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.pagination button {
  background-color: #e50914;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:disabled {
  background-color: #555;
  cursor: not-allowed;
}
</style>
