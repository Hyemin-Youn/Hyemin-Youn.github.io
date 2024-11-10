<template>
  <div class="home">
    <!-- Banner Component -->
    <Banner :heroMovie="heroMovie" />

    <!-- Movie Categories -->
    <div
      v-for="category in movieCategories"
      :key="category.name"
      class="movie-category"
    >
      <h3>{{ category.title }}</h3>
      <div class="movie-list">
        <div
          v-for="movie in category.movies"
          :key="movie.id"
          class="movie-card"
        >
          <img
            :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path"
            :alt="movie.title"
            class="movie-poster"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Banner from '@/components/Banner.vue';

export default {
  name: 'Home',
  components: {
    Banner
  },
  data() {
    return {
      heroMovie: {},
      movieCategories: [
        { name: 'popular', title: '인기 영화', movies: [] },
        { name: 'now_playing', title: '최신 영화', movies: [] },
        { name: 'top_rated', title: '높은 평점 영화', movies: [] },
        { name: 'upcoming', title: '개봉 예정 영화', movies: [] }
      ]
    };
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
        console.error('Error fetching hero movie:', error);
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
    }
  }
};
</script>

<style scoped>
.home {
  padding: 20px;
  background-color: #141414;
  color: #ffffff;
}

.movie-category {
  margin-bottom: 20px;
}

.movie-category h3 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.movie-list {
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding-bottom: 10px;
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
