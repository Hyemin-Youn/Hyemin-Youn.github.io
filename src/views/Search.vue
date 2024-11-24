<template>
  <div class="search-page" @scroll="handleScroll">
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
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img :src="getPosterUrl(movie.poster_path)" :alt="movie.title" class="movie-poster" />
        <div class="movie-title">{{ movie.title }}</div>
      </div>
    </div>

    <!-- 로딩 표시 -->
    <div v-if="loading" class="loading">로딩 중...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdowns: {
        originalLanguage: ["장르 (전체)", "Action", "Adventure", "Comedy", "Crime", "Family"],
        translationLanguage: ["평점 (전체)", "9~10", "8~9", "7~8", "6~7", "5~6", "4~5", "4점 이하"],
        sorting: ["언어 (전체)", "영어", "한국어"],
      },
      DEFAULT_OPTIONS: {
        originalLanguage: "장르 (전체)",
        translationLanguage: "평점 (전체)",
        sorting: "언어 (전체)",
      },
      selectedOptions: {
        originalLanguage: "장르 (전체)",
        translationLanguage: "평점 (전체)",
        sorting: "언어 (전체)",
      },
      activeDropdown: null,
      movies: [],
      currentPage: 1,
      totalPages: 1,
      loading: false,
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
      if (this.loading) return;
      this.loading = true;

      const filters = {
        genre: this.selectedOptions.originalLanguage,
        rating: this.selectedOptions.translationLanguage,
        language: this.selectedOptions.sorting,
        page,
      };

      try {
        const response = await fetch(
          `https://api.example.com/movies?genre=${filters.genre}&rating=${filters.rating}&language=${filters.language}&page=${page}`
        );
        const data = await response.json();

        if (append) {
          this.movies = [...this.movies, ...data.results];
        } else {
          this.movies = data.results;
        }

        this.currentPage = page;
        this.totalPages = data.total_pages;
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        this.loading = false;
      }
    },
    toggleDropdown(key) {
      this.activeDropdown = this.activeDropdown === key ? null : key;
    },
    selectOption(key, option) {
      this.selectedOptions[key] = option;
      this.activeDropdown = null;
      this.movies = [];
      this.fetchMovies(1); // 첫 페이지부터 다시 로드
    },
    clearOptions() {
      this.selectedOptions = { ...this.DEFAULT_OPTIONS };
      this.movies = [];
      this.fetchMovies(1); // 첫 페이지부터 다시 로드
    },
    getPosterUrl(path) {
      return `https://image.tmdb.org/t/p/w500/${path}`;
    },
    handleScroll() {
      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (bottomOfWindow && this.currentPage < this.totalPages) {
        this.fetchMovies(this.currentPage + 1, true); // 다음 페이지 데이터 추가 로드
      }
    },
  },
  created() {
    this.fetchMovies();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.search-page {
  background-color: #121212;
  color: white;
  min-height: 100vh;
  padding: 20px;
  overflow-y: auto;
}

.dropdown-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.custom-select {
  position: relative;
}

.select-selected {
  padding: 10px;
  background-color: black;
  color: white;
  cursor: pointer;
  border: 1px solid white;
  border-radius: 4px;
}

.select-items {
  position: absolute;
  background-color: #333;
  z-index: 100;
  border: 1px solid white;
  top: 100%;
  left: 0;
  right: 0;
}

.select-items div {
  padding: 10px;
  color: white;
  cursor: pointer;
}

.select-items div:hover {
  background-color: #575757;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.movie-card {
  background-color: #1e1e1e;
  border-radius: 8px;
  text-align: center;
  padding: 10px;
}

.movie-poster {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
}

.movie-title {
  margin-top: 10px;
  color: white;
  font-size: 14px;
}

.loading {
  text-align: center;
  margin-top: 20px;
}
</style>
