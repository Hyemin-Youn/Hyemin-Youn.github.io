<template>
  <div>
    <!-- Navbar -->

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
              >
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

export default {
  name: "Home",
  components: {
    Banner,
    Navbar,
  },
  data() {
    return {
      isLoading: true, // 로딩 상태
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
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
  background-color: #141414;
  color: #ffffff;
  position: relative;
}

/* 로딩 오버레이 */
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
  z-index: 10;
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
  position: relative;
  transition: transform 0.3s ease, z-index 0.3s ease;
  z-index: 1;
}

.movie-card:hover {
  transform: scale(1.2);
  z-index: 10;
}

.movie-poster {
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.movie-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  text-align: center;
  border-radius: 0 0 5px 5px;
}

.movie-card:hover .movie-info {
  opacity: 1;
}
</style>
