<template>
  <div class="search-page" @scroll="handleScroll">
    <!-- Navbar -->
    <Navbar />

    <!-- 검색 기능 -->
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
      <div class="movie-card" v-for="movie in movies" :key="movie.id">
        <img class="movie-poster" :src="getPosterUrl(movie.poster_path)" :alt="movie.title" />
        <div class="movie-title">{{ movie.title }}</div>
      </div>
    </div>

    <!-- 로딩 중 표시 -->
    <div v-if="loading" class="loading">로딩 중...</div>
    <div v-if="!loading && movies.length === 0" class="no-results">검색 결과가 없습니다.</div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Search",
  components: {
    Navbar,
  },
  data() {
    return {
      dropdowns: {
        originalLanguage: ["언어 (전체)", "en", "ko", "ja", "fr"],
        translationLanguage: ["평점 (전체)", "9~10", "8~9", "7~8", "6~7", "5~6", "4점 이하"],
        sorting: ["장르 (전체)", "28", "12", "16", "35", "80"], // TMDb 장르 ID
      },
      DEFAULT_OPTIONS: {
        originalLanguage: "언어 (전체)",
        translationLanguage: "평점 (전체)",
        sorting: "장르 (전체)",
      },
      selectedOptions: {
        originalLanguage: "언어 (전체)",
        translationLanguage: "평점 (전체)",
        sorting: "장르 (전체)",
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
      if (this.loading) return; // 중복 호출 방지
      this.loading = true;
      const filters = {
        language: this.selectedOptions.originalLanguage === "언어 (전체)" ? null : this.selectedOptions.originalLanguage,
        with_genres: this.selectedOptions.sorting === "장르 (전체)" ? null : this.selectedOptions.sorting,
        'vote_average.gte': this.selectedOptions.translationLanguage === "평점 (전체)" ? null : parseFloat(this.selectedOptions.translationLanguage.split("~")[0]),
        page,
      };

      // API 호출
      const apiKey = "your_tmdb_api_key"; // 실제 TMDb API 키
      const url = new URL("https://api.themoviedb.org/3/discover/movie");
      url.searchParams.append("api_key", apiKey);
      url.searchParams.append("page", page);
      if (filters.language) url.searchParams.append("language", filters.language);
      if (filters.with_genres) url.searchParams.append("with_genres", filters.with_genres);
      if (filters["vote_average.gte"]) url.searchParams.append("vote_average.gte", filters["vote_average.gte"]);

      try {
        const response = await fetch(url.toString());
        const data = await response.json();
        if (append) {
          this.movies = [...this.movies, ...data.results];
        } else {
          this.movies = data.results;
        }
        this.currentPage = data.page;
        this.totalPages = data.total_pages;
      } catch (error) {
        console.error("영화 데이터를 불러오는 중 오류 발생:", error);
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
      this.fetchMovies(1); // 필터 변경 시 첫 페이지로 이동
    },
    clearOptions() {
      this.selectedOptions = { ...this.DEFAULT_OPTIONS };
      this.fetchMovies(1); // 초기화 후 첫 페이지로 이동
    },
    handleScroll() {
      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (bottomOfWindow && this.currentPage < this.totalPages) {
        this.fetchMovies(this.currentPage + 1, true); // 다음 페이지 데이터 로드
      }
    },
    getPosterUrl(path) {
      return path ? `https://image.tmdb.org/t/p/w500/${path}` : "default_poster.png";
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
.search-page {
  background-color: #121212;
  color: white;
  min-height: 100vh;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.search-bar input {
  width: 70%;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-bar button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #0056b3;
}

.recent-searches,
.wishlist {
  margin-top: 20px;
  padding: 0 20px;
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

.movie-card {
  text-align: center;
  background-color: #1e1e1e;
  padding: 10px;
  border-radius: 8px;
}

.movie-poster {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 10px;
  object-fit: cover;
}

.movie-title {
  font-size: 14px;
  color: white;
}

.loading {
  text-align: center;
  margin: 20px 0;
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
