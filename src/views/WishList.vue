<template>
  <div class="wishlist">
    <Navbar />

    <h2>내가 찜한 영화</h2>

    <!-- 찜한 영화가 없는 경우 -->
    <div v-if="wishlist.length === 0" class="empty-wishlist">
      <p>찜한 영화가 없습니다.</p>
      <button @click="goToHome" class="go-home-btn">영화 보러 가기</button>
    </div>

    <!-- 찜한 영화가 있는 경우 -->
    <div v-else class="wishlist-movies">
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
import Navbar from "@/components/Navbar.vue";

const makeImagePath = (path, size) =>
  `https://image.tmdb.org/t/p/${size}${path}`;

export default {
  components: {
    Navbar,
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
  methods: {
    goToHome() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
.wishlist {
  padding: 20px;
  color: #fff;
}

.wishlist h2 {
  margin-bottom: 20px;
  font-size: 1.8em;
}

.empty-wishlist {
  text-align: center;
  margin-top: 50px;
  color: #aaa;
}

.go-home-btn {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background-color: #e50914;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
}

.go-home-btn:hover {
  background-color: #b00610;
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
