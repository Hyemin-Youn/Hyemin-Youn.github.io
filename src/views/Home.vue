<template>
  <div>
    <!-- Navbar -->
    <Navbar />

    <!-- 메인 콘텐츠 -->
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
          <div class="movie-slider">
            <!-- 왼쪽 화살표 버튼 -->
            <button class="arrow-btn left" @click="slideLeft(category.name)">
              <font-awesome-icon :icon="['fas', 'angle-left']" />
            </button>

            <!-- 영화 리스트 -->
            <div class="movie-list">
              <div
                v-for="movie in getDisplayedMovies(category.name)"
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

            <!-- 오른쪽 화살표 버튼 -->
            <button class="arrow-btn right" @click="slideRight(category.name)">
              <font-awesome-icon :icon="['fas', 'angle-right']" />
            </button>
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
        { name: "popular", title: "인기 영화", movies: [], currentIndex: 0 },
        { name: "now_playing", title: "최신 영화", movies: [], currentIndex: 0 },
        { name: "top_rated", title: "높은 평점 영화", movies: [], currentIndex: 0 },
        { name: "upcoming", title: "개봉 예정 영화", movies: [], currentIndex: 0 },
      ],
      itemsPerPage: 6, // 한 번에 표시할 영화 수
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
    slideLeft(categoryName) {
      const category = this.movieCategories.find((cat) => cat.name === categoryName);
      if (category.currentIndex > 0) {
        category.currentIndex--;
      }
    },
    slideRight(categoryName) {
      const category = this.movieCategories.find((cat) => cat.name === categoryName);
      if (category.currentIndex + this.itemsPerPage < category.movies.length) {
        category.currentIndex++;
      }
    },
    getDisplayedMovies(categoryName) {
      const category = this.movieCategories.find((cat) => cat.name === categoryName);
      return category.movies.slice(
        category.currentIndex,
        category.currentIndex + this.itemsPerPage
      );
    },
  },
};
</script>
.movie-slider {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.movie-list {
  display: flex;
  gap: 10px;
  overflow: hidden; /* 스크롤 바 제거 */
  flex: 1;
}

.movie-card {
  flex: 0 0 calc(100% / 6); /* 한 번에 6개 표시 */
  height: 250px;
  transition: transform 0.3s ease;
}

.arrow-btn {
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
}

.arrow-btn:hover {
  background: rgba(0, 0, 0, 0.9);
}
