<template>
  <div class="wishlist">
    <h2>내가 찜한 영화</h2>
    <div class="wishlist-movies">
      <div
        v-for="movie in wishlist"
        :key="movie.id"
        class="wishlist-movie"
      >
        <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" :alt="movie.title" />
        <p>{{ movie.title }}</p>
        <button @click="toggleWishlist(movie)">삭제</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const wishlist = computed(() => store.getters.wishlist);

    const toggleWishlist = (movie) => {
      store.dispatch("toggleWishlist", movie);
    };

    return { wishlist, toggleWishlist };
  },
};
</script>

<style scoped>
.wishlist {
  padding: 20px;
}

.wishlist-movies {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.wishlist-movie {
  width: 200px;
  text-align: center;
  position: relative;
}
</style>
