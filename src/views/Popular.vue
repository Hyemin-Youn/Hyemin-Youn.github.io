<template>
  <div class="popular" :class="{ 'no-scroll': viewMode === 'table' }">
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

      <!-- Table View -->
      <div v-if="viewMode === 'table'" class="movie-table">
        <table>
          <thead>
            <tr>
              <th>포스터</th>
              <th>영화 제목</th>
              <th>평점</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="movie in movies" :key="movie.id">
              <td>
                <img :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`" alt="포스터" />
              </td>
              <td>{{ movie.title }}</td>
              <td>{{ movie.vote_average }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Infinite Scroll View -->
      <div v-else class="movie-grid">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>

      <!-- Pagination (Table View 전용) -->
      <Pagination
        v-if="viewMode === 'table'"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @change-page="fetchMovies"
      />

      <!-- Loading Spinner -->
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
import { ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import MovieCard from "@/components/MovieCard.vue";
import Pagination from "@/components/Pagination.vue";
import { fetchPopularMovies } from "@/api/movies";

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
    const viewMode = ref("table"); // 초기 상태는 Table View
    const loading = ref(false);
    const showScrollTopButton = ref(false);

    const fetchMovies = async (page = 1, append = false) => {
      if (loading.value) return;
      loading.value = true;

      try {
        const data = await fetchPopularMovies(page);
        if (append) {
          movies.value = [...movies.value, ...data.results];
        } else {
          movies.value = data.results;
        }
        currentPage.value = page;
        totalPages.value = data.total_pages;
      } catch (error) {
        console.error("영화 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        loading.value = false;
      }
    };

    const changeViewMode = (mode) => {
      viewMode.value = mode;
      if (mode === "table") {
        document.body.style.overflow = "hidden"; // 스크롤 비활성화
      } else {
        document.body.style.overflow = "auto"; // 스크롤 활성화
      }
      movies.value = [];
      currentPage.value = 1;
      fetchMovies();
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleScroll = () => {
      if (viewMode.value !== "infinite") return; // Infinite Scroll View에서만 실행

      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (bottomOfWindow && currentPage.value < totalPages.value && !loading.value) {
        fetchMovies(currentPage.value + 1, true);
      }

      showScrollTopButton.value = window.scrollY > 300;
    };

    fetchMovies(); // 초기 데이터 로드

    window.addEventListener("scroll", handleScroll);

    return {
      movies,
      currentPage,
      totalPages,
      viewMode,
      loading,
      showScrollTopButton,
      changeViewMode,
      scrollToTop,
    };
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
}

.no-scroll {
  height: 100vh;
  overflow: hidden; /* 스크롤 비활성화 */
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
}

.movie-table table {
  width: 100%;
  border-collapse: collapse;
}

.movie-table th,
.movie-table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #444;
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
