<template>
  <div class="slider-content">
    <div
      v-for="movie in movies"
      :key="movie.id"
      class="movie-card"
      @click="toggleWishlist(movie)"
    >
      <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" :alt="movie.title" />
      <p>{{ movie.title }}</p>
      <span class="wishlist-icon">
        <i :class="isInWishlist(movie.id) ? 'fas fa-heart liked' : 'far fa-heart'"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const store = useStore();

    const isInWishlist = (id) => store.getters.isInWishlist(id);

    const toggleWishlist = (movie) => {
      store.dispatch("toggleWishlist", movie);
    };

    return { isInWishlist, toggleWishlist };
  },
};
</script>

<style scoped>
.slider-content {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px 0;
}

.movie-card {
  position: relative;
  width: 150px;
  cursor: pointer;
}

.movie-card img {
  width: 100%;
  border-radius: 8px;
}

.movie-card p {
  margin-top: 5px;
  text-align: center;
  font-size: 14px;
  color: white;
}

.wishlist-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
  color: white;
}

.wishlist-icon .liked {
  color: #e50914;
}
</style>
