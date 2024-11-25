<template>
  <div class="search">
    <!-- Navbar -->
    <Navbar />

    <!-- 필터 섹션 -->
    <div class="filters">
      <select v-model="filters.genre" @change="fetchMovies">
        <option value="">장르 (전체)</option>
        <option value="Action">액션</option>
        <option value="Comedy">코미디</option>
        <option value="Drama">드라마</option>
      </select>
      <select v-model="filters.rating" @change="fetchMovies">
        <option value="">평점 (전체)</option>
        <option value="8~10">8~10</option>
        <option value="5~7">5~7</option>
        <option value="0~4">0~4</option>
      </select>
      <select v-model="filters.language" @change="fetchMovies">
        <option value="">언어 (전체)</option>
        <option value="en">영어</option>
        <option value="ko">한국어</option>
      </select>
    </div>

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

    <!-- 영화 데이터 -->
    <div class="content">
      <h1>대세 콘텐츠</h1>

      <!-- SliderContent 활용 -->
      <SliderContent :movies="movies" />

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
import Navbar from "@/components/Navbar.vue";
import SliderContent from "@/components/SliderContent.vue";
import Pagination from "@/components/Pagination.vue";
import { fetchMovies } from "@/api/movies";

export default {
  name: "Search",
  components: {
    Navbar,
    SliderContent,
    Pagination,
  },
  data() {
    return {
      movies: [], // 영화 데이터
      currentPage: 1, // 현재 페이지
      totalPages: 1, // 전체 페이지 수
      viewMode: "table", // 현재 View 모드 ('table' 또는 'infinite')
      loading: false, // 로딩 상태
      showScrollTopButton: false, // 스크롤 버튼 표시 여부
      filters: { // 필터 데이터
        genre: null,
        rating: null,
        language: null,
      },
    };
  },
  methods: {
    async fetchMovies(page = 1, append = false) {
      // 로딩 중일 경우 중복 호출 방지
      if (this.loading) return;
      this.loading = true;

      // API 호출
      const data = await fetchMovies({ ...this.filters, page });

      if (append) {
        this.movies = [...this.movies, ...data.results]; // 데이터 추가
      } else {
        this.movies = data.results; // 새로운 데이터로 갱신
      }

      this.currentPage = page;
      this.totalPages = data.total_pages;
      this.loading = false;
    },
    changeViewMode(mode) {
      this.viewMode = mode;
      this.movies = []; // 데이터를 초기화
      this.currentPage = 1; // 첫 페이지부터 다시 로드
      this.fetchMovies();
    },
    handleScroll() {
      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      // 무한 스크롤 동작
      if (bottomOfWindow && this.viewMode === "infinite" && this.currentPage < this.totalPages) {
        this.fetchMovies(this.currentPage + 1, true); // 다음 페이지 로드
      }

      // 맨 위로 버튼 표시 여부
      this.showScrollTopButton = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  created() {
    this.fetchMovies(); // 초기 데이터 로드
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.search {
  padding: 20px;
  background-color: #121212;
  color: #fff;
  min-height: 100vh;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.filters select {
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
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

.content {
  padding-top: 20px;
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
