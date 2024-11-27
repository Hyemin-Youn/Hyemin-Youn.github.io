<template>
  <div class="wishlist">
    <Navbar />
    <h2>내가 찜한 콘텐츠</h2>

    <div
v-if="wishlist.length === 0"
class="empty-wishlist"
>
      <p>찜한 영화가 없습니다.</p>
    </div>
    <div
v-else
class="wishlist-movies"
>
      <div
        v-for="movie in wishlist"
        :key="movie.id"
        class="wishlist-movie"
        :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})` }"
      >
        <div class="movie-info">
          <h4>{{ movie.title }}</h4>
          <button
class="remove-btn"
@click="toggleWishlist(movie)"
>
삭제
</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "WishList",
  components: { Navbar },
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
  color: white;
}

.wishlist h2 {
  margin-bottom: 20px;
  font-size: 1.8em;
}

.wishlist-movies {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.wishlist-movie {
  width: 150px;
  height: 225px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  position: relative;
}

.movie-info {
  background: rgba(0, 0, 0, 0.6);
  padding: 10px;
  text-align: center;
  border-radius: 0 0 8px 8px;
}

.remove-btn {
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #e50914;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #b00610;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #121212; /* 배경색 추가 */
  border-bottom: 1px solid #333; /* 하단 구분선 추가 */
}
</style>
