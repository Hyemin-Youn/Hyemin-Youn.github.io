<template>
  <div class="popular">
    <Navbar />
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
    <div class="content">
      <h1>대세 콘텐츠</h1>
      <div class="movie-grid">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
      <Pagination
        v-if="viewMode === 'table'"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @change-page="fetchMovies"
      />
      <div v-if="loading && viewMode === 'infinite'" class="loading">
        로딩 중...
      </div>
      <button
        v-if="showScrollTopButton && viewMode === 'infinite'"
        class="scroll-top"
        @click="scrollToTop"
      >
        위로
      </button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import Navbar from "@/components/Navbar.vue";
import MovieCard from "@/components/MovieCard.vue";
import Pagination from "@/components/Pagination.vue";
import URLService from "@/services/URLService";
import { useScrollLock } from "@/utils/index.js";

export default {
  name: "Popular",
  components: {
    Navbar,
    MovieCard,
    Pagination,
  },
  setup() {
    const movies = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const viewMode = ref("table");
    const loading = ref(false);
    const showScrollTopButton = ref(false);

    const apiKey = "YOUR_TMDB_API_KEY"; // API 키를 여기에 입력하세요
    const isScrollLocked = useScrollLock(ref(document.body), false);

    const fetchMovies = async (page = 1, append = false) => {
      if (loading.value) return;
      loading.value = true;

      try {
        // URLService를 사용해 URL 생성
        const url = URLService.getURL4PopularMovies(apiKey, page);
        const response = await fetch(url);
        const data = await response.json();

        if (append) {
          movies.value = [...movies.value, ...data.results];
        } else {
          movies.value = data.results;
        }

        currentPage.value = page;
        totalPages.value = data.total_pages;
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        loading.value = false;
      }
    };

    const changeViewMode = (mode) => {
      viewMode.value = mode;
      isScrollLocked.value = mode === "table";
      movies.value = [];
      currentPage.value = 1;
      fetchMovies();
    };

    return {
      movies,
      currentPage,
      totalPages,
      viewMode,
      loading,
      showScrollTopButton,
      changeViewMode,
    };
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
</style>
