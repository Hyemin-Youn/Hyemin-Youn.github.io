<template>
    <div class="popular">
      <!-- Navbar -->
      <!-- <Navbar class="navbar" /> -->
  
      <!-- 영화 리스트 -->
      <div class="movie-grid">
        <MovieCard
v-for="movie in movies"
:key="movie.id"
:movie="movie"
/>
      </div>
  
      <!-- Loading Spinner -->
      <div
v-if="loading"
class="loading"
>
        로딩 중...
      </div>
  
      <!-- 맨 위로 올라가기 버튼 -->
      <button
v-if="showScrollTopButton"
class="scroll-top"
@click="scrollToTop"
>
        TOP(위로)
      </button>
    </div>
  </template>
  
  <script>
//   import Navbar from "@/components/Navbar.vue";
  import MovieCard from "@/components/MovieCard.vue";
  import { fetchPopularMovies } from "../api/movies";
  
  export default {
    name: "PopularInfinite",
    components: {
    //   Navbar,
      MovieCard,
    },
    data() {
      return {
        movies: [],
        currentPage: 1,
        totalPages: 1,
        loading: false,
        showScrollTopButton: false,
      };
    },
    created() {
      this.fetchMovies();
      window.addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
      async fetchMovies(page = 1) {
        if (this.loading || page > this.totalPages) return;
  
        this.loading = true;
        const data = await fetchPopularMovies(page);
        this.movies = [...this.movies, ...data.results];
        this.currentPage = page;
        this.totalPages = data.total_pages;
        this.loading = false;
      },
      handleScroll() {
        const bottomOfWindow =
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  
        if (bottomOfWindow && this.currentPage < this.totalPages) {
          this.fetchMovies(this.currentPage + 1); // 다음 페이지 데이터 로드
        }
  
        this.showScrollTopButton = window.scrollY > 300;
      },
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Navbar 고정 */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: #121212;
    border-bottom: 1px solid #333;
  }
  
  .popular {
    padding-top: 60px;
    background-color: #121212;
    color: #fff;
    min-height: 100vh;
  }
  
  .movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
    padding: 20px;
  }
  
  .loading {
    text-align: center;
    margin: 20px 0;
    color: white;
  }
  
  .scroll-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #e50914;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .scroll-top:hover {
    background-color: #b00610;
  }

  @media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); /* 모바일에서 카드 크기 */
    gap: 10px;
  }
}
  </style>
  