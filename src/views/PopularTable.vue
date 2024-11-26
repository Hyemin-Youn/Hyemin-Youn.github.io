<template>
  <div class="popular">


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
.popular {
  padding-top: 60px; /* Navbar 높이만큼 여백 추가 */
  background-color: #121212;
  color: #fff;
  min-height: 100vh;
}

/* 영화 그리드 */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 한 줄에 4개의 영화 포스터 */
  gap: 10px; /* 포스터 간격을 10px로 좁힘 */
  padding: 10px; /* 전체 여백도 줄임 */
  justify-items: center; /* 카드 가운데 정렬 */
}

/* 영화 카드 */
.movie-card {
  width: 120px; /* 카드 크기는 그대로 유지 */
  text-align: center;
  color: white;
}

.movie-card img {
  width: 100%;
  border-radius: 8px;
}

.movie-title {
  margin-top: 8px;
  font-size: 12px; /* 제목 글꼴 크기 */
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
    grid-template-columns: repeat(2, 1fr); /* 모바일: 2열 */
    gap: 8px;
  }

  .movie-card {
    width: 80px; /* 카드 크기 더 축소 */
  }

  .movie-title {
    font-size: 10px; /* 제목 글씨 더 축소 */
  }
}
</style>
