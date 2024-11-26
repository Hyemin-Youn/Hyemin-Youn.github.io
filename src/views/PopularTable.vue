<template>
  <div class="popular">
    <!-- Navbar -->
    <Navbar />

    <!-- 영화 리스트 -->
    <div class="movie-grid">
      <MovieCard v-for="movie in paginatedMovies" :key="movie.id" :movie="movie" />
    </div>

    <!-- 페이지네이션 -->
    <div class="pagination">
      <button
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        &lt; 이전
      </button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        다음 &gt;
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MovieCard from "@/components/MovieCard.vue";
import { fetchPopularMovies } from "@/api/movies";

export default {
  name: "PopularTable",
  components: {
    Navbar,
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
    // 현재 페이지에 해당하는 영화 목록 계산
    paginatedMovies() {
      const start = (this.currentPage - 1) * this.moviesPerPage;
      const end = start + this.moviesPerPage;
      return this.movies.slice(start, end);
    },
  },
  methods: {
    // TMDB API에서 인기 영화 데이터 가져오기
    async fetchMovies() {
      const data = await fetchPopularMovies();
      this.movies = data.results; // 영화 데이터 저장
      this.totalPages = Math.ceil(this.movies.length / this.moviesPerPage); // 총 페이지 계산
    },
    // 페이지 변경
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  created() {
    // 컴포넌트 생성 시 영화 데이터 로드
    this.fetchMovies();
  },
};
</script>

<style scoped>
/* Navbar 상단 고정 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #121212;
  border-bottom: 1px solid #333;
}

/* 페이지 전체 스타일 */
.popular { /* Navbar 높이만큼 여백 추가 */
  background-color: #121212;
  color: #fff;
  min-height: 100vh;
}

/* 영화 그리드 */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 한 줄에 4개의 영화 포스터 */
  gap: 20px;
  padding: 20px;
  justify-items: center; /* 카드 가운데 정렬 */
}

/* 영화 카드 */
.movie-card {
  width: 120px; /* 카드의 너비를 줄임 */
  text-align: center;
  color: white;
}

.movie-card img {
  width: 100%; /* 이미지가 카드 너비에 맞게 줄어듦 */
  border-radius: 8px;
}

.movie-title {
  margin-top: 8px;
  font-size: 12px; /* 제목 글꼴 크기 줄임 */
  color: #fff;
}

/* 페이지네이션 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.pagination button {
  background-color: #333;
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #555;
  cursor: not-allowed;
}

.pagination span {
  color: white;
  line-height: 40px;
}
</style>
