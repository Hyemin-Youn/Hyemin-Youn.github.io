<template>
  <div class="popular">
    <Navbar />
    <div class="view-toggle">
      <button class="active">Table View</button>
    </div>
    <div class="content">
      <h1>대세 콘텐츠</h1>
      <div class="movie-grid">
        <div v-for="movie in visibleMovies" :key="movie.id" class="movie-card">
          <img :src="getPosterUrl(movie.poster_path)" :alt="movie.title" />
          <div class="movie-title">{{ movie.title }}</div>
        </div>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">&lt; 이전</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">다음 &gt;</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { fetchPopularMovies } from "@/api/movies";

export default {
  components: { Navbar },
  data() {
    return {
      movies: [],
      currentPage: 1,
      rows: 2,
      columns: 7,
    };
  },
  computed: {
    visibleMovies() {
      return this.movies.slice(0, this.rows * this.columns);
    },
    totalPages() {
      return Math.ceil(this.movies.length / (this.rows * this.columns));
    },
  },
  methods: {
    async fetchMovies() {
      const data = await fetchPopularMovies(this.currentPage);
      this.movies = data.results;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchMovies();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchMovies();
      }
    },
    getPosterUrl(path) {
      return `https://image.tmdb.org/t/p/w500/${path}`;
    },
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* 스크롤 방지 */
  height: 100%; /* 화면 전체 높이 사용 */
}
.popular {
  padding: 20px;
  background-color: #121212;
  color: #fff;
  min-height: 100vh;
}
.movie-grid {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  justify-items: center;
  align-items: center;
  overflow: hidden;
}
.movie-card {
  width: 150px;
  transition: transform 0.3s;
}
.movie-card img {
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
}
.movie-title {
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
