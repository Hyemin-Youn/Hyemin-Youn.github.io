<template>
  <div class="popular">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="logo">
        <a href="/">넷플릭스 클론</a>
      </div>
      <ul class="nav-links">
        <li><a href="/">홈</a></li>
        <li><a href="/popular">인기 영화</a></li>
        <li><a href="/mylist">내가 찜한 리스트</a></li>
        <li><a href="/search">찾아보기</a></li>
      </ul>
    </nav>

    <!-- Main Content -->
    <div class="content">
      <h1>인기 영화</h1>
      <div class="movie-grid">
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @change-page="fetchMovies"
      />
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard';
import Pagination from '@/components/Pagination';
import { fetchPopularMovies } from '@/api/movies';

export default {
  components: {
    MovieCard,
    Pagination,
  },
  data() {
    return {
      movies: [],
      currentPage: 1,
      totalPages: 1,
    };
  },
  methods: {
    async fetchMovies(page = 1) {
      const data = await fetchPopularMovies(page);
      this.movies = data.results;
      this.currentPage = page;
      this.totalPages = data.total_pages;
    },
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
/* Navbar Styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #1a1a1a;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #444;
}

.navbar .logo a {
  font-size: 20px;
  font-weight: bold;
  color: #e50914;
  text-decoration: none;
}

.navbar .nav-links {
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 0;
}

.navbar .nav-links li a {
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  transition: color 0.3s ease;
}

.navbar .nav-links li a:hover {
  color: #e50914;
}

/* Page Content Styles */
.popular {
  padding: 20px;
  background-color: #121212;
  color: #fff;
}

.content {
  margin-top: 20px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}
</style>
