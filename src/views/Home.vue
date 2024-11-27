<template>
  <div>
    <Navbar />

    <div class="home">
<<<<<<< HEAD
      <div v-if="isLoading" class="loading-overlay">
=======
      <div
v-if="isLoading"
class="loading-overlay"
>
>>>>>>> main
        <p>로딩중...</p>
      </div>

      <div v-else>
        <Banner :heroMovie="heroMovie" />
        
<<<<<<< HEAD
        <div v-for="category in movieCategories" :key="category.name" class="movie-category">
=======
        <div
v-for="category in movieCategories"
:key="category.name"
class="movie-category"
>
>>>>>>> main
          <h3>{{ category.title }}</h3>
          <SliderContent :movies="category.movies" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Banner from "@/components/Banner.vue";
import Navbar from "@/components/Navbar.vue";
import SliderContent from "@/components/SliderContent.vue";

export default {
  name: "Home",
  components: {
    Banner,
    Navbar,
    SliderContent,
  },
  data() {
    return {
      isLoading: true,
      heroMovie: {},
      movieCategories: [
        { name: "popular", title: "인기 영화", movies: [] },
        { name: "now_playing", title: "최신 영화", movies: [] },
        { name: "top_rated", title: "높은 평점 영화", movies: [] },
        { name: "upcoming", title: "개봉 예정 영화", movies: [] },
      ],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        await Promise.all([this.fetchHeroMovie(), this.fetchMovies()]);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchHeroMovie() {
      const API_KEY = process.env.VUE_APP_API_KEY;
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`
        );
        this.heroMovie = response.data.results[0];
      } catch (error) {
        console.error("Hero Movie 로드 실패:", error);
      }
    },
    async fetchMovies() {
      const API_KEY = process.env.VUE_APP_API_KEY;
      try {
        const requests = this.movieCategories.map(async (category) => {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${category.name}?api_key=${API_KEY}&language=ko-KR`
          );
          category.movies = response.data.results;
        });
        await Promise.all(requests);
      } catch (error) {
        console.error("Movie Categories 로드 실패:", error);
      }
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

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 1.5em;
}

.movie-category {
  margin-bottom: 20px;
}

.movie-category h3 {
  font-size: 1.5em;
  margin-bottom: 10px;
}
</style>
