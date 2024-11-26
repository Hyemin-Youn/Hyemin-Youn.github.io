<template>
  <div class="search-page">
    <!-- Navbar -->
    <Navbar />

    <!-- 필터 드롭다운 -->
    <div class="dropdown-container">
      <label>선호하는 설정을 선택하세요</label>
      <div
        v-for="dropdown in dropdownEntries"
        :key="dropdown.key"
        class="custom-select"
      >
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

    <!-- TOP 버튼 -->
    <button v-if="showScrollTopButton" class="scroll-top" @click="scrollToTop">
      TOP(위로)
    </button>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MovieCard from "@/components/MovieCard.vue";
import { fetchMovies } from "@/api/movies";

export default {
  name: "Search",
  components: {
    Navbar,
    MovieCard,
  },
  data() {
    return {
      dropdowns: {
        genre: ["장르 (전체)", "Action", "Adventure", "Comedy", "Drama", "Family"],
        rating: ["평점 (전체)", "9~10", "8~9", "7~8", "6~7", "5~6", "4점 이하"],
        language: ["언어 (전체)", "en", "ko", "ja", "fr"],
      },
      DEFAULT_OPTIONS: {
        genre: "장르 (전체)",
        rating: "평점 (전체)",
        language: "언어 (전체)",
      },
      selectedOptions: {
        genre: "장르 (전체)",
        rating: "평점 (전체)",
        language: "언어 (전체)",
      },
      activeDropdown: null,
      movies: [],
      currentPage: 1,
      totalPages: 1,
      loading: false,
      showScrollTopButton: false, // TOP 버튼 표시 여부
    };
  },
  computed: {
    dropdownEntries() {
      return Object.entries(this.dropdowns).map(([key, options]) => ({
        key,
        options,
      }));
    },
  },
  methods: {
    async fetchMovies(page = 1, append = false) {
      if (this.loading || page > this.totalPages) return; // 중복 호출 방지 및 페이지 초과 방지
      this.loading = true;

      try {
        const filters = {
          genre: this.selectedOptions.genre,
          rating: this.selectedOptions.rating,
          language: this.selectedOptions.language,
          page,
        };

        const data = await fetchMovies(filters);

        if (append) {
          this.movies = [...this.movies, ...data.results];
        } else {
          this.movies = data.results;
        }

        this.currentPage = page;
        this.totalPages = data.total_pages;
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error);
      } finally {
        this.loading = false;
      }
    },
    toggleDropdown(key) {
      this.activeDropdown = this.activeDropdown === key ? null : key;
    },
    selectOption(key, option) {
      this.selectedOptions = {
        ...this.selectedOptions,
        [key]: option,
      };
      this.activeDropdown = null;
      this.movies = []; // 기존 데이터를 초기화
      this.currentPage = 1; // 첫 페이지로 이동
      this.fetchMovies(1); // 필터 변경 시 데이터 재로드
    },
    clearOptions() {
      this.selectedOptions = { ...this.DEFAULT_OPTIONS };
      this.movies = []; // 기존 데이터를 초기화
      this.currentPage = 1; // 첫 페이지로 이동
      this.fetchMovies(1); // 초기화 후 데이터 재로드
    },
    handleScroll() {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 100 && !this.loading) {
        this.fetchMovies(this.currentPage + 1, true); // 다음 페이지 데이터 로드
      }

      this.showScrollTopButton = window.scrollY > 300; // 스크롤이 300px 이상일 때 TOP 버튼 표시
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" }); // 부드럽게 화면 맨 위로 이동
    },
  },
  created() {
    this.fetchMovies(); // 초기 데이터 로드
    window.addEventListener("scroll", this.handleScroll); // 스크롤 이벤트 등록
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll); // 스크롤 이벤트 해제
  },
};
</script>

<style scoped>
.search-page {
  background-color: #121212;
  color: white;
  min-height: 100vh;
  padding: 20px;
}

.dropdown-container {
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.custom-select {
  position: relative;
  display: inline-block;
}

.select-selected {
  padding: 8px 16px;
  background-color: #333;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.select-items {
  position: absolute;
  background-color: #444;
  border: 1px solid #ccc;
  z-index: 1000;
  width: 100%;
}

.select-items div {
  padding: 10px;
  cursor: pointer;
}

.select-items div:hover {
  background-color: #555;
}

.clear-options {
  padding: 8px 16px;
  background-color: #e50914;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  border: none;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.scroll-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #e50914;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
