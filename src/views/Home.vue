<template>
  <div>
    <Navbar />

    <div class="home">
      <div v-if="isLoading" class="loading-overlay">
        <p>로딩중 ...</p>
      </div>
      <div v-else>
        <Banner :heroMovie="heroMovie" />
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
  computed: {
    ...mapGetters(["wishlist"]),
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
}
.heart-btn.active {
  color: red;
}
</style>
