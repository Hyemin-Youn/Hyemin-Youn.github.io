<template>
  <div class="popular" :class="{ 'no-scroll': viewMode === 'table' }">
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
      <h1>인기 영화</h1>

      <!-- 영화 리스트 -->
      <div class="movie-grid">
        <div v-for="(movieRow, index) in visibleMovieGroups" :key="index" class="movie-row">
          <MovieCard
            v-for="movie in movieRow"
            :key="movie.id"
            :movie="movie"
          />
        </div>
      </div>

      <!-- Pagination (Table View 전용) -->
      <div v-if="viewMode === 'table'" class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">&lt; 이전</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">다음 &gt;</button>
      </div>

      <!-- Loading Spinner (Infinite Scroll 전용) -->
      <div v-if="loading && viewMode === 'infinite'" class="loading">
        로딩 중...
      </div>

      <!-- 맨 위로 올라가기 버튼 -->
      <button v-if="showScrollTopButton" class="scroll-top" @click="scrollToTop">
        위로
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MovieCard from "@/components/MovieCard.vue";
import { fetchPopularMovies } from "@/api/movies";

export default {
  name: "Popular",
  components: {
    Navbar,
    MovieCard,
  },
  data() {
    return {
      movies: [], // 모든 영화 데이터
      currentPage: 1, // 현재 페이지
      rowSize: 4, // 한 행에 표시할 영화 개수
      moviesPerPage: 20, // 한 페이지에 표시할 영화 수
      totalPages: 1, // 총 페이지 수
      viewMode: "table", // 현재 View 모드 ('table' 또는 'infinite')
      loading: false, // 로딩 상태
      showScrollTopButton: false, // 스크롤 상단 버튼 표시 여부
    };
  },
  computed: {
    visibleMovieGroups() {
      const startIndex = (this.currentPage - 1) * this.moviesPerPage;
      const endIndex = startIndex + this.moviesPerPage;
      const paginatedMovies = this.movies.slice(startIndex, endIndex);

      return paginatedMovies.reduce((groups, movie, index) => {
        const groupIndex = Math.floor(index / this.rowSize);
        if (!groups[groupIndex]) {
          groups[groupIndex] = [];
        }
        groups[groupIndex].push(movie);
        return groups;
      }, []);
    },
    totalPages() {
      return Math.ceil(this.movies.length / this.moviesPerPage);
    },
  },
  methods: {
    async fetchMovies() {
      try {
        this.loading = true;
        const data = await fetchPopularMovies(this.currentPage);
        this.movies = data.results;
        this.loading = false;
      } catch (error) {
        console.error("Error fetching movies:", error);
        this.loading = false;
      }
    },
    changeViewMode(mode) {
      this.viewMode = mode;
      if (mode === "table") {
        this.currentPage = 1;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  created() {
    this.fetchMovies(); // 초기 영화 데이터 로드
  },
};
</script>

<style scoped>
.popular {
  padding: 20px;
  background-color: #121212;
  color: #fff;
  min-height: 100vh;
}

.popular.no-scroll {
  overflow: hidden; /* Table View에서 스크롤 비활성화 */
}

.view-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.view-toggle button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 4px;
}

.view-toggle button.active {
  background-color: #e50914;
}

.movie-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.movie-row {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
