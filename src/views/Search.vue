<template>
  <div class="search-page">
    <Navbar />
    <div class="content">
      <h1>영화 검색</h1>
      
      <!-- 필터링 UI -->
      <div class="dropdown-container">
        <label>선호하는 설정을 선택하세요</label>
        <div v-for="dropdown in dropdownEntries" :key="dropdown.key" class="custom-select">
          <div class="select-selected" @click="toggleDropdown(dropdown.key)">
            {{ selectedOptions[dropdown.key] }}
          </div>
          <div v-if="activeDropdown === dropdown.key" class="select-items">
            <div
              v-for="option in dropdown.options"
              :key="option"
              @click="selectOption(dropdown.key, option)"
            >
              {{ option }}
            </div>
          </div>
        </div>
        <button class="clear-options" @click="clearOptions">초기화</button>
      </div>

      <!-- 영화 리스트 -->
      <div class="movie-grid">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>

      <!-- 로딩 표시 -->
      <div v-if="loading" class="loading">로딩 중...</div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MovieCard from "@/components/MovieCard.vue";
import { fetchMovies } from "@/api/movies";

export default {
  components: {
    Navbar,
    MovieCard,
  },
  data() {
    return {
      movies: [],
      currentPage: 1,
      totalPages: 1,
      selectedOptions: {
        originalLanguage: "장르 (전체)",
        translationLanguage: "평점 (전체)",
        sorting: "정렬 (전체)",
      },
      activeDropdown: null,
      loading: false,
    };
  },
  computed: {
    dropdownEntries() {
      return [
        { key: "originalLanguage", options: ["장르 (전체)", "Action", "Comedy", "Drama"] },
        { key: "translationLanguage", options: ["평점 (전체)", "9~10", "8~9", "7~8"] },
        { key: "sorting", options: ["정렬 (전체)", "인기순", "개봉 최신순", "평점 높은순"] },
      ];
    },
  },
  methods: {
    async fetchMovies(page = 1) {
      if (this.loading) return; // 중복 요청 방지
      this.loading = true;

      const filters = {
        genre: this.selectedOptions.originalLanguage !== "장르 (전체)" ? this.selectedOptions.originalLanguage : null,
        rating: this.selectedOptions.translationLanguage !== "평점 (전체)" ? this.selectedOptions.translationLanguage : null,
        sorting: this.selectedOptions.sorting !== "정렬 (전체)" ? this.selectedOptions.sorting : null,
        page,
      };

      const data = await fetchMovies(filters);
      if (page === 1) {
        this.movies = data.results;
      } else {
        this.movies.push(...data.results);
      }

      this.currentPage = page;
      this.totalPages = data.total_pages;
      this.loading = false;
    },
    toggleDropdown(key) {
      this.activeDropdown = this.activeDropdown === key ? null : key;
    },
    selectOption(key, option) {
      this.selectedOptions[key] = option;
      this.fetchMovies(1); // 필터 변경 시 첫 페이지로 이동
    },
    clearOptions() {
      this.selectedOptions = {
        originalLanguage: "장르 (전체)",
        translationLanguage: "평점 (전체)",
        sorting: "정렬 (전체)",
      };
      this.fetchMovies(1); // 초기화 후 첫 페이지로 이동
    },
    handleScroll() {
      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (bottomOfWindow && this.currentPage < this.totalPages) {
        this.fetchMovies(this.currentPage + 1); // 무한 스크롤
      }
    },
  },
  created() {
    this.fetchMovies();
    window.addEventListener("scroll", this.handleScroll); // 스크롤 이벤트 추가
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll); // 스크롤 이벤트 제거
  },
};
</script>

<style scoped>
.search-page {
  background-color: #121212;
  color: white;
  min-height: 100vh;
}

.content {
  padding: 20px;
}

.dropdown-container {
  margin: 20px 0;
  display: flex;
  gap: 15px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.loading {
  text-align: center;
  color: white;
  margin: 20px 0;
}
</style>
