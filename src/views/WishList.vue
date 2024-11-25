<template>
  <div class="wishlist">
    <!-- Navbar 추가 -->
    <Navbar />

    <h2>내가 찜한 영화</h2>
    <div class="wishlist-movies">
      <div
        v-for="movie in wishlist"
        :key="movie.id"
        class="wishlist-movie"
        :style="{ backgroundImage: `url(${makeImagePath(movie.poster_path, 'w500')})` }"
      >
        <div class="movie-info">
          <h4>{{ movie.title }}</h4>
          <button @click="removeFromWishlist(movie.id)" class="remove-btn">
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
import Navbar from "@/components/Navbar.vue"; // Navbar 컴포넌트 추가

const makeImagePath = (path, size) =>
  `https://image.tmdb.org/t/p/${size}${path}`;

export default {
  components: {
    Navbar, // Navbar 등록
  },
  setup() {
    const store = useStore();

    // Vuex의 wishlist 가져오기
    const wishlist = computed(() => store.getters.wishlist);

    // Vuex의 removeFromWishlist 액션 호출
    const removeFromWishlist = (movieId) => {
      store.dispatch("removeFromWishList", movieId);
    };

    return { wishlist, makeImagePath, removeFromWishlist };
  },
};
</script>

<style scoped>
/* Navbar 높이에 따라 아래 컨텐츠를 배치 */
.wishlist {
  padding: 20px;
  color: #fff;
}

.wishlist h2 {
  margin-bottom: 20px;
  font-size: 1.8em;
}

.wishlist-movies {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

.wishlist-movie {
  width: 200px;
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.movie-info {
  background: rgba(0, 0, 0, 0.6);
  padding: 10px;
  text-align: center;
  border-radius: 0 0 6px 6px;
}

.movie-info h4 {
  margin: 0;
  font-size: 1.2em;
  color: #fff;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);
}

.remove-btn {
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #e50914;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background-color: #b00610;
}
</style>
