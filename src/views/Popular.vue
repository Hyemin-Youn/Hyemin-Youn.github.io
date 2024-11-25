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

      <!-- 영화 리스트 -->
      <div class="movie-grid" v-if="movies.length > 0">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>

      <!-- 데이터 없음 메시지 -->
      <div v-if="!loading && movies.length === 0" class="no-data">
        데이터를 찾을 수 없습니다.
      </div>

      <!-- 로딩 표시 -->
      <div v-if="loading" class="loading">
        데이터를 불러오는 중입니다...
      </div>

      <!-- Pagination (Table View 전용) -->
      <Pagination
        v-if="viewMode === 'table'"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @change-page="changePage"
      />
    </div>
  </div>
</template>

<script>
import { fetchPopularMovies, fetchMovies } from "@/api/movie";

export default {
  data() {
    return {
      viewMode: "table", // 'table' or 'infinite'
      movies: [], // API에서 가져온 영화 리스트
      currentPage: 1, // 현재 페이지
      totalPages: 1, // 전체 페이지 수
      loading: false, // 로딩 상태
      filters: {
        genre: "장르 (전체)",
        rating: "평점 (전체)",
        language: "언어 (전체)",
        page: 1,
      },
    };
  },
  methods: {
    async loadPopularMovies() {
      try {
        this.loading = true;
        const data = await fetchPopularMovies(this.currentPage);
        this.movies = data.results; // API에서 영화 리스트를 가져옴
        this.totalPages = data.total_pages; // 총 페이지 수
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        alert("데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        this.loading = false;
      }
    },
    async applyFilters() {
      try {
        this.loading = true;
        const data = await fetchMovies(this.filters);
        this.movies = data.results; // 필터 적용 후 영화 리스트 갱신
      } catch (error) {
        console.error("Error applying filters:", error);
        alert("필터 데이터를 가져오는 중 문제가 발생했습니다.");
      } finally {
        this.loading = false;
      }
    },
    changeViewMode(mode) {
      this.viewMode = mode;
      if (mode === "table") {
        this.loadPopularMovies();
      }
    },
    changePage(page) {
      this.currentPage = page;
      this.loadPopularMovies();
    },
  },
  mounted() {
    this.loadPopularMovies(); // 컴포넌트가 마운트될 때 인기 영화 가져오기
  },
};
</script>

<style>
/* 전체 스크롤 비활성화 */
body,
#app {
  overflow-y: hidden;
}

/* 반응형 그리드 */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  padding: 16px;
}

/* 로딩 표시 */
.loading {
  text-align: center;
  font-size: 18px;
  color: gray;
}

/* 데이터 없음 메시지 */
.no-data {
  text-align: center;
  font-size: 20px;
  margin-top: 50px;
  color: #999;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  margin: 16px 0;
}
</style>
