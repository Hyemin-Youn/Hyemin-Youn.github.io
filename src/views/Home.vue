<template>
  <div>
    <!-- Navbar -->
    <Navbar />

    <div class="home">
      <!-- 로딩 중 표시 -->
      <div v-if="isLoading" class="loading-overlay">
        <p>로딩중 ...</p>
      </div>

      <!-- 메인 콘텐츠 -->
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
                <!-- 하트 버튼 -->
                <button
                  class="heart-btn"
                  :class="{ active: isInWishList(movie) }"
                  @click="toggleWishList(movie)"
                >
                  ♥
                </button>
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
import { mapActions, mapGetters } from "vuex";

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
  computed: {
    ...mapGetters(["wishlist"]), // Vuex에서 wishlist 상태 가져오기
  },
  created() {
    this.loadData();
  },
  methods: {
    ...mapActions(["addToWishList", "removeFromWishList"]), // Vuex 액션 매핑

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
    toggleWishList(movie) {
      if (this.isInWishList(movie)) {
        this.removeFromWishList(movie.id);
      } else {
        this.addToWishList(movie);
      }
    },
    isInWishList(movie) {
      return this.wishlist.some((item) => item.id === movie.id);
    },
  },
};
</script>

<style scoped>
.heart-btn {
  background: none;
  border: none;
  color: gray;
  font-size: 1.5rem;
  cursor: pointer;
  margin-top: 10px;
  transition: transform 0.2s;
}
.heart-btn.active {
  color: red;
}
.heart-btn:hover {
  transform: scale(1.2);
}
.movie-card {
  width: 200px;
  margin: 10px;
  text-align: center;
}
.movie-info h4 {
  font-size: 1rem;
  margin: 10px 0 5px;
}
.movie-info p {
  font-size: 0.9rem;
  margin: 5px 0;
}
</style>
