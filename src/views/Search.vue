<template>
  <div class="search-page" @scroll="handleScroll">
    <Navbar />
    <div class="content">
      <h1>영화 검색</h1>
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
      loading: false,
      isFetching: false, // 중복 요청 방지 플래그
      selectedOptions: {
        originalLanguage: "장르 (전체)",
        translationLanguage: "평점 (전체)",
        sorting: "언어 (전체)",
      },
      activeDropdown: null,
    };
  },
  methods: {
    async fetchMovies(page = 1, append = false) {
      if (this.isFetching) return;
      this.isFetching = true; // 중복 요청 방지
      this.loading = true;

      const genreMapping = {
        "장르 (전체)": null,
        Action: 28,
        Comedy: 35,
        Drama: 18,
      };

      const filters = {
        genre: genreMapping[this.selectedOptions.originalLanguage],
        rating: this.selectedOptions.translationLanguage,
        language: this.selectedOptions.sorting,
        page,
      };

      try {
        const data = await fetchMovies(filters);
        if (append) {
          this.movies = [...this.movies, ...data.results];
        } else {
          this.movies = data.results;
        }
        this.totalPages = data.total_pages;
        this.currentPage = page;
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        this.loading = false;
        this.isFetching = false;
      }
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
        sorting: "언어 (전체)",
      };
      this.fetchMovies(1); // 초기화 후 첫 페이지로 이동
    },
    handleScroll() {
      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (bottomOfWindow && this.currentPage < this.totalPages) {
        this.fetchMovies(this.currentPage + 1, true); // 다음 페이지 데이터 로드
      }
    },
  },
  created() {
    this.fetchMovies();
    window.addEventListener("scroll", this.handleScroll); // 스크롤 이벤트 추가
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll); // 이벤트 제거
  },
};
</script>

<style scoped>
.search-page {
  background-color: #121212;
  color: white;
  min-height: 100vh;
  overflow-y: auto;
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
  margin-top: 20px;
  color: white;
}
</style>
