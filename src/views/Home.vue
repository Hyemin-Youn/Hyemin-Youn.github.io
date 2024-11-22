<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero">
      <img :src="heroImage" alt="Hero Movie" class="hero-image" />
      <div class="hero-content">
        <h2>{{ heroMovie.title }}</h2>
        <p>{{ heroMovie.overview }}</p>
        <button @click="goToDetail(heroMovie.id)">상세 보기</button>
      </div>
    </div>

    <!-- Movie Categories -->
    <div v-for="category in movieCategories" :key="category.name" class="category-section">
      <h3>{{ category.title }}</h3>
      <SliderContent :movies="category.movies" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SliderContent from "../components/SliderContent.vue";

export default {
  name: "Home",
  components: { SliderContent },
  data() {
    return {
      heroMovie: {},
      movieCategories: [
        { name: "popular", title: "인기 영화", movies: [] },
        { name: "now_playing", title: "최신 영화", movies: [] },
        { name: "top_rated", title: "높은 평점 영화", movies: [] },
      ],
    };
  },
  computed: {
    heroImage() {
      return this.heroMovie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${this.heroMovie.backdrop_path}`
        : "";
    },
  },
  created() {
    this.fetchHeroMovie();
    this.fetchMovies();
  },
  methods: {
    async fetchHeroMovie() {
      const API_KEY = process.env.VUE_APP_API_KEY;
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`
      );
      this.heroMovie = response.data.results[0];
    },
    async fetchMovies() {
      const API_KEY = process.env.VUE_APP_API_KEY;
      for (const category of this.movieCategories) {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${category.name}?api_key=${API_KEY}&language=ko-KR`
        );
        category.movies = response.data.results;
      }
    },
    goToDetail(id) {
      this.$router.push(`/movies/${id}`);
    },
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
  background-color: #141414;
  color: #fff;
}

.hero {
  position: relative;
  margin-bottom: 50px;
}

.category-section {
  margin-bottom: 50px;
}
</style>
