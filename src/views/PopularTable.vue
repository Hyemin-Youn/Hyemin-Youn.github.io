<template>
  <div>
    <!-- Navbar -->
    <Navbar />

    <!-- View Toggle Buttons -->
    <div class="view-toggle">
      <button
        :class="{ active: currentView === 'table' }"
        @click="switchView('table')"
      >
        📋 Table View
      </button>
      <button
        :class="{ active: currentView === 'infinite' }"
        @click="switchView('infinite')"
      >
        📜 무한 스크롤 View
      </button>
    </div>

    <!-- Conditional View Rendering -->
    <div v-if="currentView === 'table'" class="popular-table">
      <div class="movies-container">
        <div class="movie-grid">
          <MovieCard
            v-for="movie in paginatedMovies"
            :key="movie.id"
            :movie="movie"
          />
        </div>
      </div>
      <!-- Pagination -->
      <div class="pagination">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
        >
          이전
        </button>
        <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
        >
          다음
        </button>
      </div>
    </div>

    <div v-else class="popular-infinite">
      <div class="movie-grid">
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
      <!-- Infinite Scroll Loader -->
      <div v-if="loading" class="loading">로딩 중...</div>
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
      currentView: "table", // Default view is Table
      currentPage: 1,
      moviesPerPage: 12, // Movies per page in table view
      movies: [], // Movie data
      loading: false, // Loading state for infinite scroll
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
    switchView(view) {
      this.currentView = view;
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    async fetchMovies() {
      this.loading = true;
      // Simulate an API call
      setTimeout(() => {
        this.movies = [...Array(30)].map((_, i) => ({
          id: i + 1,
          title: `영화 ${i + 1}`,
        }));
        this.loading = false;
      }, 1000);
    },
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
/* View Toggle Buttons */
.view-toggle {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  padding: 10px;
  background: #222;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

.view-toggle button {
  background-color: #444;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
}

.view-toggle button.active {
  background-color: #e50914;
  border: 2px solid #fff;
}

.popular-table {
  padding: 20px;
}

.movies-container {
  height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
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

.popular-infinite {
  padding: 20px;
}

.loading {
  text-align: center;
  color: #fff;
  margin-top: 20px;
}
</style>
