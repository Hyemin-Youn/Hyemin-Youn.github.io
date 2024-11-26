<template>
  <div class="popular">
    <div class="movie-grid" ref="gridContainer">
      <div :class="['grid-container', currentView]">
        <div
          v-for="(movieGroup, index) in visibleMovieGroups"
          :key="index"
          :class="['movie-row', { full: movieGroup.length === rowSize }]"
        >
          <div
            v-for="movie in movieGroup"
            :key="movie.id"
            class="movie-card"
            @mouseup="toggleWishlist(movie)"
          >
            <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
            <div class="movie-title">{{ movie.title }}</div>
            <div v-if="isInWishlist(movie.id)" class="wishlist-indicator">👍</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 페이지네이션 -->
    <div class="pagination" v-if="totalPages > 1">
      <button @click="prevPage" :disabled="currentPage === 1">&lt; 이전</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">다음 &gt;</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PopularTable",
  data() {
    return {
      movies: [],
      currentPage: 1,
      rowSize: 4,
      moviesPerPage: 20,
      currentView: "grid",
      wishlist: [],
      isMobile: window.innerWidth <= 768,
    };
  },
  computed: {
    visibleMovieGroups() {
      const startIndex = (this.currentPage - 1) * this.moviesPerPage;
      const endIndex = startIndex + this.moviesPerPage;
      const paginatedMovies = this.movies.slice(startIndex, endIndex);

      return paginatedMovies.reduce((resultArray, item, index) => {
        const groupIndex = Math.floor(index / this.rowSize);
        if (!resultArray[groupIndex]) {
          resultArray[groupIndex] = [];
        }
        resultArray[groupIndex].push(item);
        return resultArray;
      }, []);
    },
    totalPages() {
      return Math.ceil(this.movies.length / this.moviesPerPage);
    },
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
          params: {
            api_key: "YOUR_TMDB_API_KEY",
            language: "ko-KR",
            page: this.currentPage,
          },
        });
        this.movies = response.data.results;
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/w300${path}`;
    },
    toggleWishlist(movie) {
      if (this.wishlist.includes(movie.id)) {
        this.wishlist = this.wishlist.filter((id) => id !== movie.id);
      } else {
        this.wishlist.push(movie.id);
      }
    },
    isInWishlist(movieId) {
      return this.wishlist.includes(movieId);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchMovies();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchMovies();
      }
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
      this.calculateLayout();
    },
    calculateLayout() {
      const container = this.$refs.gridContainer;
      if (container) {
        const containerWidth = container.offsetWidth;
        const containerHeight = window.innerHeight - container.offsetTop;
        const movieCardWidth = this.isMobile ? 90 : 200;
        const movieCardHeight = this.isMobile ? 150 : 220;
        const horizontalGap = this.isMobile ? 10 : 15;
        const verticalGap = -10;

        this.rowSize = Math.floor(containerWidth / (movieCardWidth + horizontalGap));
        const maxRows = Math.floor(containerHeight / (movieCardHeight + verticalGap));
        this.moviesPerPage = this.rowSize * maxRows;
      }
    },
  },
  async created() {
    await this.fetchMovies();
    this.calculateLayout();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
.popular {
  padding: 20px;
  background-color: #121212;
  color: white;
  min-height: 100vh;
}

.movie-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.grid-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
}

.movie-row {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.movie-card {
  width: 200px;
  text-align: center;
  color: white;
  position: relative;
  transition: transform 0.3s;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  border-radius: 8px;
}

.movie-title {
  margin-top: 8px;
  font-size: 14px;
}

.wishlist-indicator {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 16px;
  color: red;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  background-color: #e50914;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #555;
  cursor: not-allowed;
}
</style>
