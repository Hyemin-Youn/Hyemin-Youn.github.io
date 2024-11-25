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
      <div class="movie-grid" v-if="viewMode === 'table'">
        <MovieCard v-for="movie in paginatedMovies" :key="movie.id" :movie="movie" />
      </div>

      <div class="movie-grid" v-else>
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>

      <!-- Pagination (Table View 전용) -->
      <Pagination
        v-if="viewMode === 'table'"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @change-page="changePage"
      />

      <!-- Loading Spinner -->
      <div v-if="loading && viewMode === 'infinite'" class="loading">
        Loading...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewMode: 'table', // 'table' or 'infinite'
      movies: [], // 전체 영화 리스트
      paginatedMovies: [], // 현재 페이지의 영화 리스트
      currentPage: 1, // 현재 페이지
      totalPages: 1, // 전체 페이지 수
      itemsPerPage: 10, // 페이지당 항목 수
      loading: false, // 로딩 상태
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.movies.length / this.itemsPerPage);
    },
  },
  methods: {
    fetchMovies() {
      // 서버에서 데이터를 가져오는 로직 추가
      // 예시: this.movies = response.data
    },
    changePage(page) {
      this.currentPage = page;
      this.updatePaginatedMovies();
    },
    updatePaginatedMovies() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.paginatedMovies = this.movies.slice(start, end);
    },
    changeViewMode(mode) {
      this.viewMode = mode;
      if (mode === 'table') {
        this.updatePaginatedMovies();
      }
    },
  },
  mounted() {
    this.fetchMovies();
  },
};
</script>

<style>
/* 전체 스크롤 비활성화 */
body, #app {
  overflow-y: hidden;
}

/* 반응형 그리드 */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  padding: 16px;
}

/* 버튼 스타일 */
.view-toggle button {
  margin: 8px;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}
.view-toggle .active {
  background-color: #007bff;
  color: white;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  margin: 16px 0;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: gray;
}
</style>
