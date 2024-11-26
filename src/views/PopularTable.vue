<template>
  <div class="popular-table">
    <!-- <Navbar /> -->

    <div class="movies-container">
      <div class="movie-grid">
        <MovieCard v-for="movie in paginatedMovies" :key="movie.id" :movie="movie" />
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">이전</button>
      <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">다음</button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MovieCard from "@/components/MovieCard.vue";

export default {
  components: { Navbar, MovieCard },
  data() {
    return {
      currentPage: 1,
      moviesPerPage: 12, // 한 페이지에 표시할 영화 수
      movies: [], // 전체 영화 데이터
    };
  },
  computed: {
    paginatedMovies() {
      const start = (this.currentPage - 1) * this.moviesPerPage;
      return this.movies.slice(start, start + this.moviesPerPage);
    },
    totalPages() {
      return Math.ceil(this.movies.length / this.moviesPerPage);
    },
  },
  methods: {
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  created() {
    // 예시: 영화 데이터 가져오기
    this.movies = [...Array(30)].map((_, i) => ({ id: i + 1, title: `영화 ${i + 1}` }));
  },
};
</script>

<style scoped>
.popular-table {
  padding: 20px;
  color: white;
}

.movies-container {
  height: calc(100vh - 150px); /* Navbar와 Pagination 제외 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 한 줄에 6개 */
  gap: 15px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  background-color: #333;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:disabled {
  background-color: #666;
  cursor: not-allowed;
}
</style>
