<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero">
      <img :src="makeImagePath(heroMovie.backdrop_path, 'w1280')" alt="Hero Movie" />
      <div class="hero-content">
        <h2>{{ heroMovie.title }}</h2>
        <p>{{ heroMovie.overview }}</p>
        <button @click="goToDetail(heroMovie.id)">상세 보기</button>
      </div>
    </div>

    <!-- Movie Categories -->
    <div v-for="category in movieCategories" :key="category.name" class="movie-category">
      <h3>{{ category.title }}</h3>
      <SliderContent :movies="category.movies" />
    </div>
  </div>
</template>

<script>
import SliderContent from "@/views/SliderContent.vue";
import axios from "axios";

export default {
  name: "Home",
  components: { SliderContent },
  data() {
    return {
      heroMovie: {}, // Hero Section의 메인 영화
      movieCategories: [
        { name: "popular", title: "인기 영화", movies: [] },
        { name: "now_playing", title: "최신 영화", movies: [] },
        { name: "top_rated", title: "높은 평점 영화", movies: [] },
        { name: "upcoming", title: "개봉 예정 영화", movies: [] },
      ],
    };
  },
  created() {
    this.fetchHeroMovie();
    this.fetchMovies();
  },
  methods: {
    async fetchHeroMovie() {
      const API_KEY = process.env.VUE_APP_API_KEY; // .env에 API 키 저장
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`
        );
        this.heroMovie = response.data.results[0]; // 첫 번째 영화 가져오기
      } catch (error) {
        console.error("Error fetching hero movie:", error);
      }
    },
    async fetchMovies() {
      const API_KEY = process.env.VUE_APP_API_KEY;
      try {
        for (const category of this.movieCategories) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${category.name}?api_key=${API_KEY}&language=ko-KR`
          );
          category.movies = response.data.results;
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    goToDetail(movieId) {
      this.$router.push(`/movies/${movieId}`);
    },
    makeImagePath(path, size) {
      return `https://image.tmdb.org/t/p/${size}${path}`;
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
  width: 100%;
  height: 500px;
  margin-bottom: 20px;
}

.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.hero-content {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
}

.hero-content h2 {
  font-size: 2em;
  margin-bottom: 10px;
}

.hero-content p {
  font-size: 1.2em;
}

button {
  background-color: #e50914;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #bf0812;
}

.movie-category {
  margin-bottom: 40px;
}

.movie-category h3 {
  font-size: 1.5em;
  margin-bottom: 20px;
}
</style>
