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
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MovieCard from "@/components/MovieCard.vue";

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
      selectedOptions: {
        genre: "장르 (전체)",
        rating: "평점 (전체)",
        language: "언어 (전체)",
      },
      movies: [], // TMDB API에서 가져온 영화 목록
      activeDropdown: null,
    };
  },
  methods: {
    toggleDropdown(key) {
      this.activeDropdown = this.activeDropdown === key ? null : key;
    },
    selectOption(key, option) {
      this.selectedOptions = {
        ...this.selectedOptions,
        [key]: option,
      };
    },
    clearOptions() {
      this.selectedOptions = {
        genre: "장르 (전체)",
        rating: "평점 (전체)",
        language: "언어 (전체)",
      };
    },
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
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
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

/* 영화 그리드 */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* 카드 최소 크기 */
  gap: 20px;
  padding: 20px;
}

/* 영화 카드 */
.movie-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #222;
  border-radius: 8px;
  padding: 10px;
  transition: transform 0.3s ease-in-out;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.movie-card .movie-title {
  margin-top: 10px;
  font-size: 14px;
  color: white;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
