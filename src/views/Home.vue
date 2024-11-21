<template>
  <div>
    <Navbar />
    <Banner :heroMovie="heroMovie" />
    <div v-if="isLoading">로딩중...</div>
    <div v-else>
      <div
        v-for="category in movieCategories"
        :key="category.name"
        class="movie-category"
      >
        <h3>{{ category.title }}</h3>
        <vue-slick-carousel class="movie-slider" :settings="sliderSettings">
          <div
            class="movie-card"
            v-for="movie in category.movies"
            :key="movie.id"
            @click="toggleWishList(movie)"
          >
            <img
              :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path"
              :alt="movie.title"
              class="movie-poster"
            >
          </div>
        </vue-slick-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Banner.vue";
import Navbar from "@/components/Navbar.vue";
import { mapActions, mapGetters } from "vuex";
import VueSlickCarousel from "vue-slick-carousel";

export default {
  name: "Home",
  components: {
    Banner,
    Navbar,
    VueSlickCarousel,
  },
  data() {
    return {
      isLoading: true,
      heroMovie: {},
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
  methods: {
    ...mapActions(["addToWishList", "removeFromWishList"]),
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
    async loadData() {
      // API 요청 코드
    },
  },
};
</script>

<style scoped>
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
  transform: scale(1.1); /* 마우스 오버 시 크기 확대 */
  z-index: 1; /* 겹치는 문제 방지 */
}
.movie-poster {
  width: 100%;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
}
</style>