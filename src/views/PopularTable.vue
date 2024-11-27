<template>
  <div class="popular">
    <!-- 영화 리스트 -->
    <div class="movie-grid">
      <MovieCard
v-for="movie in paginatedMovies"
:key="movie.id"
:movie="movie"
/>
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
import MovieCard from "@/components/MovieCard.vue";
import { fetchPopularMovies } from "@/api/movies";

export default {
  name: "PopularTable",
  components: {
    MovieCard,
  },
  data() {
    return {
      movies: [], // 전체 영화 데이터
      currentPage: 1, // 현재 페이지
      totalPages: 1, // 총 페이지 수
      moviesPerPage: this.calculateMoviesPerPage(), // 한 페이지에 표시할 영화 수 (동적)
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
  created() {
    // 컴포넌트 생성 시 영화 데이터 로드 및 resize 이벤트 리스너 추가
    this.fetchMovies();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    // 컴포넌트 파괴 시 이벤트 리스너 제거
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    // TMDB API에서 여러 페이지의 데이터를 가져와 병합
    async fetchMovies() {
      try {
        const totalPagesToFetch = 3; // 가져올 페이지 수
        let allMovies = [];

        for (let page = 1; page <= totalPagesToFetch; page++) {
          const data = await fetchPopularMovies(page);
          allMovies = [...allMovies, ...data.results];
        }

        this.movies = allMovies;
        this.totalPages = Math.ceil(this.movies.length / this.moviesPerPage);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    // 페이지 변경
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    // 화면 크기에 따라 moviesPerPage 계산
    calculateMoviesPerPage() {
      if (window.innerWidth <= 480) {
        return 9; // 모바일: 9개
      } else if (window.innerWidth <= 768) {
        return 6; // 태블릿: 6개
      } else {
        return 10; // 기본: 10개
      }
    },
    // 화면 크기 변화 감지
    handleResize() {
      this.moviesPerPage = this.calculateMoviesPerPage();
      this.totalPages = Math.ceil(this.movies.length / this.moviesPerPage);
    },
  },
};
</script>

<style scoped>
/* 기본 스타일 */
.popular {
  padding-top: 60px; /* 상단 여백 추가 */
  background-color: #000; /* 배경색을 검은색으로 설정 */
  color: #fff; /* 텍스트 흰색 */
  min-height: 100vh; /* 최소 높이 100vh */
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 기본: 5열 */
  gap: 10px;
  padding: 10px;
  justify-items: center;
}

.movie-card {
  width: 130px;
  text-align: center;
}

.movie-title {
  font-size: 12px;
}

/* 반응형 스타일 */
@media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(3, 1fr); /* 태블릿: 3열 */
    gap: 10px;
  }

  .movie-card {
    width: 90px; /* 카드 크기 축소 */
  }

  .movie-title {
    font-size: 11px; /* 제목 글씨 크기 축소 */
  }
}

@media (max-width: 480px) {
  .movie-grid {
    grid-template-columns: repeat(3, 1fr); /* 모바일: 3열 */
    gap: 8px;
  }

  .movie-card {
    width: 70px; /* 카드 크기 더 축소 */
  }

  .movie-title {
    font-size: 0.5px; /* 제목 글씨 크기 더 축소 */
  }
}
</style>
