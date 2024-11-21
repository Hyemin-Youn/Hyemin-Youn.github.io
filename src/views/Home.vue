<template>
  <div>
    <Navbar />

    <!-- 조건부 렌더링: 상세 정보 페이지 -->
    <div v-if="movieId" class="movie-details">
      <img
        :src="'https://image.tmdb.org/t/p/original' + movie.backdrop_path"
        alt="Movie Poster"
        class="movie-banner"
      />
      <div class="movie-content">
        <h1>{{ movie.title }}</h1>
        <p>{{ movie.overview }}</p>
        <p>평점: ⭐ {{ movie.vote_average }}</p>
        <p>개봉일: {{ movie.release_date }}</p>
      </div>
    </div>

    <!-- 조건부 렌더링: 홈 화면 -->
    <div v-else>
      <Banner :heroMovie="heroMovie" />
      <div v-if="isLoading">로딩중...</div>
      <div v-else>
        <div
          v-for="category in movieCategories"
          :key="category.name"
          class="movie-category"
        >
          <h3>{{ category.title }}</h3>
          <vue-slick-carousel
            class="movie-slider"
            :settings="sliderSettings"
          >
            <div
              v-for="movie in category.movies"
              :key="movie.id"
              class="movie-card"
              @click="navigateToDetails(movie.id)"
            >
              <img
                :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path"
                :alt="movie.title"
                class="movie-poster"
              />
            </div>
          </vue-slick-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Banner from "@/components/Banner.vue";
import VueSlickCarousel from "vue-slick-carousel";
import axios from "axios";

export default {
  name: "HomeAndDetails",
  components: {
    Navbar,
    Banner,
    VueSlickCarousel,
  },
  data() {
    return {
      isLoading: true,
      heroMovie: {},
      movieId: null,
      movie: {},
      sliderSettings: {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
      },
      movieCategories: [
        { name: "popular", title: "인기 영화", movies: [] },
        { name: "now_playing", title: "최신 영화", movies: [] },
        { name: "top_rated", title: "높은 평점 영화", movies: [] },
        { name: "upcoming", title: "개봉 예정 영화", movies: [] },
      ],
    };
  },
  created() {
    this.movieId = this.$route.params.id || null; // URL에서 영화 ID 가져오기
    if (this.movieId) {
      this.fetchMovieDetails(this.movieId); // 상세 페이지 데이터 가져오기
    } else {
      this.loadHomeData(); // 홈 화면 데이터 가져오기
    }
  },
  methods: {
    async fetchMovieDetails(id) {
      const API_KEY = process.env.VUE_APP_API_KEY;
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`
        );
        this.movie = response.data;
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    },
    async loadHomeData() {
      const API_KEY = process.env.VUE_APP_API_KEY;
      const categories = ["popular", "now_playing", "top_rated", "upcoming"];
      try {
        for (const category of categories) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=ko-KR`
          );
          const categoryIndex = this.movieCategories.findIndex(
            (cat) => cat.name === category
          );
          if (categoryIndex !== -1) {
            this.movieCategories[categoryIndex].movies = response.data.results;
          }
        }
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    },
    navigateToDetails(movieId) {
      this.$router.push({ path: `/movie/${movieId}` }); // 영화 상세 페이지로 이동
    },
  },
};
</script>

<style scoped>
/* 공통 스타일 */
.movie-details,
.movie-category {
  margin: 20px auto;
  max-width: 1200px;
}

.movie-banner {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.movie-content {
  text-align: center;
  padding: 20px;
}

.movie-slider {
  margin: 20px 0;
}

.movie-card {
  width: 200px;
  margin: 10px;
  text-align: center;
  position: relative;
  transition: transform 0.3s ease-in-out;
}

.movie-card:hover {
  transform: scale(1.1);
  z-index: 1;
}

.movie-poster {
  width: 100%;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
}
</style>
