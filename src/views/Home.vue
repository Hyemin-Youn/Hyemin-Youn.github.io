<template>
  <div>
    <!-- Navbar -->
    <Navbar />

    <!-- 찜한 리스트 -->
    <div class="favorite-list">
      <h2>내가 찜한 리스트</h2>
      <div class="favorite-movies">
        <div
          v-for="movie in favoriteMovies"
          :key="movie.id"
          class="movie-card"
        >
          <img
            :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path"
            :alt="movie.title"
            class="movie-poster"
          />
          <div class="movie-info">
            <h4>{{ movie.title }}</h4>
          </div>
        </div>
      </div>
    </div>

    <!-- SliderContent Component -->
    <SliderContent
      :movies="movieCategories[0].movies"
      :onFavoriteToggle="toggleFavorite"
    />

    <div class="home">
      <!-- 로딩 중 표시 -->
      <div v-if="isLoading" class="loading-overlay">
        <p>로딩중 ...</p>
      </div>

      <!-- 메인 콘텐츠 (로딩 완료 후 표시) -->
      <div v-else>
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
              <div class="movie-info">
                <h4>{{ movie.title }}</h4>
                <p>평점: ⭐ {{ movie.vote_average }}</p>
                <p>개봉일: {{ movie.release_date }}</p>
              </div>
            </div>
          </div>
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
      isLoading: true, // 로딩 상태
      heroMovie: {},
      favoriteMovies: [], // 찜한 리스트
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
        this.isLoading = false; // 로딩 완료
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
    toggleFavorite(movie) {
      const index = this.favoriteMovies.findIndex((m) => m.id === movie.id);
      if (index === -1) {
        this.favoriteMovies.push(movie); // 찜 추가
      } else {
        this.favoriteMovies.splice(index, 1); // 찜 제거
      }
    },
  },
};
</script>

<style scoped>
.favorite-list {
  margin-bottom: 20px;
  background-color: #222;
  padding: 20px;
  border-radius: 10px;
}

.favorite-movies {
  display: flex;
  gap: 10px;
  overflow-x: auto;
}

.movie-poster {
  width: 100%;
  border-radius: 5px;
}

.movie-info {
  margin-top: 5px;
  text-align: center;
  color: white;
}
</style>
