<template>
  <div class="wishlist">
    <h2>내가 찜한 영화</h2>
    <div class="wishlist-movies">
      <div
        v-for="movie in wishlist"
        :key="movie.id"
        class="wishlist-movie"
        :style="{ backgroundImage: `url(${makeImagePath(movie.poster_path, 'w500')})` }"
      >
        <h4>{{ movie.title }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

const makeImagePath = (path, size) =>
  `https://image.tmdb.org/t/p/${size}${path}`;

export default {
  setup() {
    const store = useStore();
    const wishlist = computed(() => store.getters.wishlist);
    return { wishlist, makeImagePath };
  },
};
</script>

<style scoped>
.wishlist {
  padding: 20px;
  color: #fff;
}

.wishlist-movies {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.wishlist-movie {
  width: 200px;
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
}
</style>
