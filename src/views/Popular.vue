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
import { ref } from "vue";
import { useScrollLock } from "@vueuse/core";
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
    const viewMode = ref("table");
    const loading = ref(false);
    const showScrollTopButton = ref(false);

    const isScrollLocked = useScrollLock(ref(document.body), false);

    // 영화 데이터를 가져오는 함수
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
        // 기본 데이터 설정 (API 실패 시)
        if (!append) {
          movies.value = [{ id: 1, title: "샘플 영화" }];
          totalPages.value = 1;
        }
      } finally {
        loading.value = false;
      }
    };

    // 뷰 모드 전환
    const changeViewMode = (mode) => {
      viewMode.value = mode;
      isScrollLocked.value = mode === "table"; // 스크롤 잠금 설정
      movies.value = []; // 데이터 초기화
      currentPage.value = 1;
      fetchMovies();
    };

    // 스크롤 맨 위로 이동
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // 스크롤 이벤트 처리
    const handleScroll = () => {
      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (
        bottomOfWindow &&
        viewMode.value === "infinite" &&
        currentPage.value < totalPages.value &&
        !loading.value
      ) {
        fetchMovies(currentPage.value + 1, true);
      }

      showScrollTopButton.value = window.scrollY > 300;
    };

    // 초기 데이터 로드
    fetchMovies();

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
