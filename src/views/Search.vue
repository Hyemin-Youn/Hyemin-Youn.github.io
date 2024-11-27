<template>
<<<<<<< HEAD
  <div class="search-page">
=======
  <div
class="search-page"
@scroll="handleScroll"
>
>>>>>>> main
    <!-- Navbar -->
    <Navbar />

    <!-- 검색 기능 -->
<<<<<<< HEAD
=======
    <h1>영화 검색</h1>
>>>>>>> main
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="영화 제목을 검색하세요"
        @keydown.enter="handleSearch"
<<<<<<< HEAD
      />
      <button @click="handleSearch">검색</button>
    </div>

    <!-- 최근 검색어 -->
    <div v-if="recentSearches.length" class="recent-searches">
      <h2>최근 검색어</h2>
      <ul>
        <li v-for="(query, index) in recentSearches" :key="index" @click="searchFromHistory(query)">
          {{ query }}
=======
      >
      <button @click="handleSearch">
검색
</button>
    </div>

    <!-- 최근 검색어 목록 -->
    <div
v-if="recentSearches.length"
class="recent-searches"
>
      <h3>최근 검색어</h3>
      <ul>
        <li
v-for="(search, index) in recentSearches"
:key="index"
>
          <span @click="searchFromHistory(search)">{{ search }}</span>
          <button
class="delete-btn"
@click="deleteSearchHistory(index)"
>
X
</button>
>>>>>>> main
        </li>
      </ul>
    </div>

<<<<<<< HEAD
    <!-- 영화 리스트 -->
    <div class="movie-grid">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @toggleWishlist="toggleWishlist(movie)"
        @addViewHistory="addViewHistory(movie)"
      />
    </div>

    <!-- 즐겨찾기 영화 -->
    <div v-if="wishlist.length" class="wishlist">
      <h2>즐겨찾기한 영화</h2>
      <ul>
        <li v-for="movie in wishlist" :key="movie.id">
          {{ movie.title }}
          <button @click="toggleWishlist(movie)">즐겨찾기 제거</button>
        </li>
      </ul>
    </div>

    <!-- 로딩 표시 -->
    <div v-if="loading" class="loading">로딩 중...</div>

    <!-- TOP 버튼 -->
    <button v-if="showScrollTopButton" class="scroll-top" @click="scrollToTop">
      TOP(위로)
    </button>
=======
    <div class="dropdown-container">
      <label>선호하는 설정을 선택하세요</label>
      <div
        v-for="dropdown in dropdownEntries"
        :key="dropdown.key"
        class="custom-select"
      >
        <div
          class="select-selected"
          @click="toggleDropdown(dropdown.key)"
        >
          {{ selectedOptions[dropdown.key] }}
        </div>
        <div
          v-if="activeDropdown === dropdown.key"
          class="select-items"
        >
          <div
            v-for="option in dropdown.options"
            :key="option"
            @click="selectOption(dropdown.key, option)"
          >
            {{ option }}
          </div>
        </div>
      </div>
      <button
class="clear-options"
@click="clearOptions"
>
초기화
</button>
    </div>

    <!-- 영화 리스트 -->
    <div class="movie-grid">
      <div
v-for="movie in movies"
:key="movie.id"
class="movie-card"
>
        <div class="poster-container">
          <img
            class="movie-poster"
            :src="getPosterUrl(movie.poster_path)"
            :alt="movie.title"
          >
          <button
            class="favorite-btn"
            :class="{ favorited: isInWishlist(movie.id) }"
            @click="toggleWishlist(movie)"
          >
            ❤
          </button>
        </div>
        <div class="movie-title">
{{ movie.title }}
</div>
      </div>
    </div>

    <!-- 로딩 중 표시 -->
    <div
v-if="loading"
class="loading"
>
로딩 중...
</div>
>>>>>>> main
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
<<<<<<< HEAD
import MovieCard from "@/components/MovieCard.vue";
=======
import { fetchMovies, searchMovies } from "@/api/movies";
>>>>>>> main
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Search",
  components: {
    Navbar,
<<<<<<< HEAD
    MovieCard,
  },
  data() {
    return {
      searchQuery: "",
=======
  },
  data() {
    return {
      searchQuery: "", // 영화 제목 검색
      dropdowns: {
        originalLanguage: ["장르 (전체)", "Action", "Adventure", "Comedy", "Crime", "Family"],
        translationLanguage: ["평점 (전체)", "9~10", "8~9", "7~8", "6~7", "5~6", "4~5", "4점 이하"],
        sorting: ["언어 (전체)", "en", "ko"],
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
>>>>>>> main
      movies: [],
      currentPage: 1,
      totalPages: 1,
      loading: false,
<<<<<<< HEAD
      showScrollTopButton: false,
    };
  },
  computed: {
    ...mapGetters(["searchHistory", "wishlist", "viewHistory"]),
    recentSearches() {
      return this.searchHistory.slice().reverse(); // 최신순
    },
  },
  methods: {
    ...mapActions(["addSearchHistory", "toggleWishlist", "addViewHistory"]),
    async handleSearch() {
      if (!this.searchQuery.trim()) return;

      // 검색 기록 저장
      this.addSearchHistory(this.searchQuery);

      // 검색 API 호출 (fetchMovies를 대체할 API 사용 가능)
      this.loading = true;
      try {
        const data = await fetchMovies({ query: this.searchQuery });
        this.movies = data.results;
        this.totalPages = data.total_pages;
        this.currentPage = 1;
      } catch (error) {
        console.error("검색 중 오류 발생:", error);
=======
    };
  },
  computed: {
    ...mapGetters(["recentSearches", "wishlist", "isInWishlist"]),
    dropdownEntries() {
      return Object.entries(this.dropdowns).map(([key, options]) => ({
        key,
        options,
      }));
    },
  },
  created() {
    this.fetchMovies();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    ...mapActions(["addSearchHistory", "setSearchResults", "toggleWishlist", "deleteSearchHistory"]),
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
        const data = await fetchMovies(filters);
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
    async handleSearch() {
      if (!this.searchQuery.trim()) return;

      this.loading = true;
      try {
        this.addSearchHistory(this.searchQuery); // 검색어 저장
        const data = await searchMovies(this.searchQuery, 1);
        this.movies = data || [];
        this.currentPage = 1;
        this.totalPages = data.total_pages || 1;
        this.setSearchResults(this.movies);
      } catch (error) {
        console.error("검색 중 오류 발생:", error.message);
>>>>>>> main
      } finally {
        this.loading = false;
      }
    },
    searchFromHistory(query) {
      this.searchQuery = query;
      this.handleSearch();
    },
<<<<<<< HEAD
    toggleWishlist(movie) {
      this.$store.dispatch("toggleWishlist", movie); // 즐겨찾기 추가/제거
    },
    addViewHistory(movie) {
      this.$store.dispatch("addViewHistory", movie); // 시청 기록 추가
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
=======
    toggleDropdown(key) {
      this.activeDropdown = this.activeDropdown === key ? null : key;
    },
    selectOption(key, option) {
      this.selectedOptions = {
        ...this.selectedOptions,
        [key]: option,
      };
      this.activeDropdown = null;
      this.fetchMovies(1);
    },
    clearOptions() {
      this.selectedOptions = { ...this.DEFAULT_OPTIONS };
      this.fetchMovies(1);
    },
    handleScroll() {
      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (bottomOfWindow && this.currentPage < this.totalPages) {
        this.fetchMovies(this.currentPage + 1, true);
      }
    },
    getPosterUrl(path) {
      return path
        ? `https://image.tmdb.org/t/p/w500/${path}`
        : "default_poster.png";
>>>>>>> main
    },
  },
};
</script>

<<<<<<< HEAD
=======

>>>>>>> main
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

<<<<<<< HEAD
.recent-searches,
.wishlist {
  margin-top: 20px;
  padding: 0 20px;
=======
.recent-searches {
  margin: 20px auto;
  max-width: 70%;
  background: #1e1e1e;
  padding: 10px;
  border-radius: 5px;
}

.recent-searches ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recent-searches li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  color: white;
}

.recent-searches li span {
  cursor: pointer;
}

.recent-searches li .delete-btn {
  background: red;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 2px 6px;
  cursor: pointer;
}

.recent-searches li .delete-btn:hover {
  background: darkred;
}

.poster-container {
  position: relative;
}

.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
}

.favorite-btn.favorited {
  color: red;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.dropdown-container {
  margin: 20px 0;
  display: flex;
  gap: 15px;
>>>>>>> main
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
<<<<<<< HEAD
  padding-top: 20px;
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
=======
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
>>>>>>> main
}
</style>
