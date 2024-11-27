<template>
  <div class="search-page">
    <!-- Navbar -->
    <Navbar />

    <!-- 검색 기능 -->
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="영화 제목을 검색하세요"
        @keydown.enter="handleSearch"
      />
      <button @click="handleSearch">검색</button>
    </div>

    <!-- 최근 검색어 -->
    <div v-if="recentSearches.length" class="recent-searches">
      <h2>최근 검색어</h2>
      <ul>
        <li
          v-for="(query, index) in recentSearches"
          :key="index"
          @click="searchFromHistory(query)"
        >
          {{ query }}
        </li>
      </ul>
    </div>

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

    <!-- 로딩 중 -->
    <div v-if="loading" class="loading">로딩 중...</div>

    <!-- 데이터가 없는 경우 -->
    <div v-if="!loading && movies.length === 0 && !errorMessage" class="no-results">
      검색 결과가 없습니다.
    </div>

    <!-- 에러 메시지 -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MovieCard from "@/components/MovieCard.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Search",
  components: {
    Navbar,
    MovieCard,
  },
  computed: {
    ...mapGetters(["movies", "loading", "searchHistory", "wishlist", "errorMessage"]),
    searchQuery: {
      get() {
        return this.$store.getters.searchQuery;
      },
      set(value) {
        this.$store.commit("SET_SEARCH_QUERY", value);
      },
    },
    recentSearches() {
      return this.searchHistory.slice().reverse();
    },
  },
  methods: {
    ...mapActions(["fetchMovies", "addSearchHistory", "toggleWishlist", "addViewHistory"]),
    async handleSearch() {
      if (!this.searchQuery.trim()) return;
      this.addSearchHistory(this.searchQuery);
      await this.fetchMovies({ page: 1 });
    },
    searchFromHistory(query) {
      this.searchQuery = query;
      this.handleSearch();
    },
  },
  created() {
    this.fetchMovies({ page: 1 });
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
