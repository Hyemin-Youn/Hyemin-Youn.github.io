<template>
  <div class="popular">
    <!-- Navbar -->
    <!-- <Navbar class="navbar" /> -->

    <!-- 영화 리스트 -->
    <div class="movie-grid">
      <MovieCard v-for="movie in paginatedMovies" :key="movie.id" :movie="movie" />
    </div>

    <!-- Pagination -->
    <div class="pagination">
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
  </div>
</template>

<script>
// import Navbar from "@/components/Navbar.vue";
import MovieCard from "@/components/MovieCard.vue";
import { fetchPopularMovies } from "../api/movies";

export default {
  name: "PopularTable",
  components: {
    // Navbar,
    MovieCard,
  },
  data() {
    return {
      movies: [], // 전체 영화 데이터
      currentPage: 1, // 현재 페이지
      totalPages: 1, // 총 페이지 수
      moviesPerPage: 8, // 한 페이지에 표시할 영화 수
    };
  },
  computed: {
    // 현재 페이지의 영화 데이터를 계산
    paginatedMovies() {
      const start = (this.currentPage - 1) * this.moviesPerPage;
      const end = start + this.moviesPerPage;
      return this.movies.slice(start, end);
    },
  },
  methods: {
    async fetchMovies() {
      // 영화 데이터를 가져오는 함수
      const data = await fetchPopularMovies();
      this.movies = data.results; // 전체 영화 데이터 저장
      this.totalPages = Math.ceil(this.movies.length / this.moviesPerPage); // 총 페이지 계산
    },
    changePage(page) {
      // 페이지 변경 메서드
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  created() {
    this.fetchMovies(); // 컴포넌트가 생성될 때 데이터 로드
  },
};
</script>

<style scoped>
.popular {
  padding-top: 60px;
  background-color: #121212;
  color: #fff;
  min-height: 100vh;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4열 고정 */
  gap: 20px; /* 카드 간격 */
  padding: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination button:hover {
  background-color: #e50914;
}

.pagination button:disabled {
  background-color: #666;
  cursor: not-allowed;
}

.pagination span {
  color: #fff;
  margin: 0 10px;
}
</style>
