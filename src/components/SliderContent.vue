<template>
  <div class="slider-wrapper">
    <button class="arrow-btn left" @click="slideLeft">
      <font-awesome-icon :icon="['fas', 'angle-left']" />
    </button>

    <div class="poster-list">
      <div
        v-for="movie in displayedMovies"
        :key="movie.id"
        class="poster"
        :class="{ liked: isLiked(movie) }"
        :style="{ backgroundImage: `url(${makeImagePath(movie.poster_path, 'w500')})` }"
        @click="toggleWishlist(movie)"
      >
        <div class="info">
          <h4>{{ movie.title }}</h4>
          <p>평점: ⭐ {{ movie.vote_average }}</p>
          <p>개봉일: {{ movie.release_date }}</p>
          <font-awesome-icon
            v-if="isLiked(movie)"
            class="heart-icon"
            :icon="['fas', 'heart']"
          />
        </div>
      </div>
    </div>

    <button class="arrow-btn right" @click="slideRight">
      <font-awesome-icon :icon="['fas', 'angle-right']" />
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
      itemsPerPage: 6,
    };
  },
  computed: {
    displayedMovies() {
      return this.movies.slice(
        this.currentIndex,
        this.currentIndex + this.itemsPerPage
      );
    },
    ...mapGetters(["wishlist"]),
  },
  methods: {
    ...mapActions(["addToWishList", "removeFromWishList"]),
    toggleWishlist(movie) {
      if (this.isLiked(movie)) {
        this.removeFromWishList(movie.id);
      } else {
        this.addToWishList(movie);
      }
    },
    isLiked(movie) {
      return this.wishlist.some((item) => item.id === movie.id);
    },
    slideLeft() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    slideRight() {
      if (this.currentIndex + this.itemsPerPage < this.movies.length) {
        this.currentIndex++;
      }
    },
    makeImagePath(path, size) {
      return `https://image.tmdb.org/t/p/${size}${path}`;
    },
  },
};
</script>

<style scoped>
.poster {
  position: relative;
  cursor: pointer;
  transition: transform 0.3s;
}

.poster.liked {
  outline: 3px solid #e50914;
}

.info {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.3s;
}

.poster:hover .info {
  opacity: 1;
}

.heart-icon {
  color: #e50914;
  font-size: 1.5rem;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
