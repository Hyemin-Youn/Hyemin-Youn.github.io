<template>
  <div class="popular">
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
import MovieCard from "@/components/MovieCard.vue";
import { fetchPopularMovies } from "../api/movies";

export default {
  name: "PopularTable",
  components: {
    MovieCard,
  },
  data() {
    return {
      movies: [],
      currentPage: 1,
      totalPages: 1,
      moviesPerPage: 8, // 한 페이지에 표시할 영화 수
    };
  },
  computed: {
    paginatedMovies() {
      const start = (this.currentPage - 1) * this.moviesPerPage;
      const end = start + this.moviesPerPage;
      return this.movies.slice(start, end);
    },
  },
  methods: {
    async fetchMovies() {
      const data = await fetchPopularMovies();
      this.movies = data.results;
      this.totalPages = Math.ceil(this.movies.length / this.moviesPerPage);
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
.popular {
  padding-top: 60px;
  background-color: #121212;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 영화 그리드와 페이지네이션 간격 자동 조정 */
}

.movie-grid {
  flex-grow: 1; /* 그리드가 가능한 공간을 차지하도록 설정 */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* 반응형 5열 */
  gap: 20px; /* 영화 포스터 간격 */
  padding: 20px 30px; /* 좌우 간격 조정 */
  align-items: center; /* 그리드 아이템 가운데 정렬 */
  justify-items: center; /* 가로로 가운데 정렬 */
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  padding: 10px;
  background-color: #222;
  border-radius: 10px;
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

.pagination span {
  color: #fff;
  margin: 0 10px;
  font-size: 16px;
}

/* 반응형 스타일 */
@media (max-width: 1024px) {
  .movie-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* 중간 크기 화면에서 4열 */
  }
}

@media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr); /* 모바일 화면에서는 2열 */
    gap: 15px; /* 모바일 화면에서 간격 좁힘 */
  }

  .pagination button {
    padding: 8px 12px;
    font-size: 14px;
  }

  .pagination span {
    font-size: 14px;
  }
}
</style>
