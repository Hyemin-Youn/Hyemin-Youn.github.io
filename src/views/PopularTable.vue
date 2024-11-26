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
import axios from "axios";

export default {
  name: "PopularTable",
  components: {
    // Navbar,
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
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: {
              api_key: "YOUR_API_KEY", // TMDB API 키
              language: "ko-KR", // 한국어 설정
              page: this.currentPage,
            },
          }
        );
        this.movies = response.data.results;
        this.totalPages = response.data.total_pages;
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchMovies(); // 페이지 변경 시 영화 데이터 다시 로드
      }
    },
  },
  created() {
    this.fetchMovies(); // 컴포넌트 생성 시 첫 페이지 데이터 로드
  },
};
</script>

<style scoped>
/* Navbar 고정 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #121212;
  border-bottom: 1px solid #333;
}

.popular {
  padding-top: 60px;
  background-color: #121212;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 영화 그리드와 페이지네이션 사이 간격 자동 조정 */
}

.movie-grid {
  flex-grow: 1; /* 그리드가 가능한 공간을 차지하도록 설정 */
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4열 고정 */
  gap: 15px; /* 영화 포스터 간격 조정 */
  padding: 20px;
  align-items: center; /* 그리드 아이템 가운데 정렬 */
  justify-items: center; /* 가로로 가운데 정렬 */
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  background-color: #222;
  border-radius: 10px;
}

.pagination button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 5px 10px;
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

/* 반응형 스타일 */
@media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr); /* 모바일 화면에서는 2열 */
    gap: 10px; /* 모바일 화면에서 간격 조정 */
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
