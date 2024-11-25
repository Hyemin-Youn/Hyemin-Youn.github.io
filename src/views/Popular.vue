<template>
  <div class="popular" :class="{ 'no-scroll': viewMode === 'grid' }">
    <!-- Navbar -->
    <Navbar />

    <!-- View Toggle Buttons -->
    <div class="view-toggle">
      <button
        :class="{ active: viewMode === 'grid' }"
        @click="changeViewMode('grid')"
      >
        Grid View
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

      <!-- Grid View -->
      <div v-if="viewMode === 'grid'" class="movie-grid">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>

      <!-- Infinite Scroll View -->
      <div v-if="viewMode === 'infinite'" class="infinite-scroll">
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
        />
        <div v-if="loading" class="loading">로딩 중...</div>
      </div>

      <!-- Scroll to Top Button -->
      <button
        v-if="showScrollTopButton"
        class="scroll-top"
        @click="scrollToTop"
      >
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
  name: "PopularMovies",
  components: {
    Navbar,
    MovieCard,
  },
  data() {
    return {
      movies: [],
      currentPage: 1,
      totalPages: 1,
      viewMode: "grid", // 현재 View 모드 ('grid' 또는 'infinite')
      loading: false,
      showScrollTopButton: false, // 스크롤 상단 버튼 표시 여부
    };
  },
  methods: {
    async fetchMovies(page = 1, append = false) {
      if (this.loading) return;
      this.loading = true;

      try {
        const data = await fetchPopularMovies(page);

        if (append) {
          this.movies = [...this.movies, ...data.results];
        } else {
          this.movies = data.results;
        }

        this.currentPage = page;
        this.totalPages = data.total_pages;
      } catch (error) {
        console.error("영화 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        this.loading = false;
      }
    },
    changeViewMode(mode) {
      this.viewMode = mode;
      this.movies = [];
      this.currentPage = 1;
      this.fetchMovies();
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    handleScroll() {
      const scrollTop = window.scrollY;
      this.showScrollTopButton = scrollTop > 300;

      if (
        this.viewMode === "infinite" &&
        window.innerHeight + scrollTop >= document.body.offsetHeight - 50
      ) {
        if (this.currentPage < this.totalPages) {
          this.fetchMovies(this.currentPage + 1, true);
        }
      }
    },
  },
  created() {
    this.fetchMovies();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.popular {
  padding: 20px;
  background-color: #121212;
  color: #fff;
  min-height: 100vh;
  overflow-y: auto;
}

.no-scroll {
  height: 100vh;
  overflow: hidden;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.infinite-scroll {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.loading {
  text-align: center;
  margin: 20px 0;
  color: white;
}

.scroll-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #e50914;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
