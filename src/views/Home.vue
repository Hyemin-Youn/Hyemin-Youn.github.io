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
    <div class="movie-category" v-for="category in movieCategories" :key="category.name">
      <h3>{{ category.title }}</h3>
      <SliderContent :movies="category.movies" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SliderContent from "@/views/SliderContent.vue"; // 슬라이더 컴포넌트 임포트

export default {
  name: "Home",
  components: { SliderContent }, // SliderContent 컴포넌트 등록
  data() {
    return {
      heroMovie: {},
      movieCategories: [
        { name: "popular", title: "인기 영화", movies: [] },
        { name: "now_playing", title: "최신 영화", movies: [] },
        { name: "top_rated", title: "높은 평점 영화", movies: [] },
        { name: "upcoming", title: "개봉 예정 영화", movies: [] },
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
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`
        );
        this.heroMovie = response.data.results[0];
      } catch (error) {
        console.error("Error fetching hero movie:", error);
      }
    },
    async fetchMovies() {
      const API_KEY = process.env.VUE_APP_API_KEY;
      const requests = this.movieCategories.map(async (category) => {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${category.name}?api_key=${API_KEY}&language=ko-KR`
        );
        category.movies = response.data.results;
      });
      await Promise.all(requests);
    },
    goToDetail(movieId) {
      this.$router.push(`/movie/${movieId}`);
    },
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
  background-color: #141414;
  color: #ffffff;
}

.hero {
  position: relative;
  height: 60vh;
  margin-bottom: 40px;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6);
  border-radius: 10px;
}

.hero-content {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #fff;
}

.hero-content h2 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.hero-content p {
  font-size: 1.2em;
  max-width: 50%;
}

.hero-content button {
  padding: 10px 20px;
  font-size: 1em;
  background-color: #e50914;
  border: none;
  color: #fff;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;
}

.hero-content button:hover {
  background-color: #bf0812;
}

.movie-category {
  margin-bottom: 40px;
}

.movie-category h3 {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.slider-wrapper {
  position: relative;
  overflow: hidden;
}

.movie-list {
  display: flex;
  overflow-x: auto;
  gap: 10px;
}

.movie-card {
  width: 150px;
  flex-shrink: 0;
}

.movie-poster {
  width: 100%;
  border-radius: 5px;
}
</style>
