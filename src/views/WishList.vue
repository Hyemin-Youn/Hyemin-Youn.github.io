<template>
  <div class="wishlist">
    <Navbar />
    <h2>내가 찜한 콘텐츠</h2>

    <!-- 필터 버튼 -->
    <div class="filter-buttons">
      <button @click="filterBy('genre')" :class="{ active: activeFilter === 'genre' }">
        장르
      </button>
      <button @click="filterBy('rating')" :class="{ active: activeFilter === 'rating' }">
        평점
      </button>
      <button @click="filterBy('language')" :class="{ active: activeFilter === 'language' }">
        언어
      </button>
    </div>

    <!-- 찜한 콘텐츠 -->
    <div v-if="filteredWishlist.length === 0" class="empty-wishlist">
      <p>찜한 영화가 없습니다.</p>
    </div>
    <div v-else class="wishlist-movies">
      <div
        v-for="movie in filteredWishlist"
        :key="movie.id"
        class="wishlist-movie"
        :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})` }"
      >
        <div class="movie-info">
          <h4>{{ movie.title }}</h4>
          <p>장르: {{ movie.genre }}</p>
          <p>평점: {{ movie.rating }}</p>
          <p>언어: {{ movie.language }}</p>
          <button @click="toggleWishlist(movie)" class="remove-btn">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Navbar from "@/components/Navbar.vue";

export default {
  components: { Navbar },
  setup() {
    const store = useStore();
    const wishlist = computed(() => store.getters.wishlist);

    const toggleWishlist = (movie) => {
      store.dispatch("toggleWishlist", movie);
    };

    // 필터 상태 관리
    const activeFilter = ref(null);
    const filteredWishlist = computed(() => {
      if (!activeFilter.value) return wishlist.value;

      // 필터 기준에 따라 필터링
      return wishlist.value.filter((movie) => {
        if (activeFilter.value === "genre") {
          return movie.genre === "드라마"; // 예: 드라마 필터
        } else if (activeFilter.value === "rating") {
          return movie.rating >= 8; // 평점 8 이상 필터
        } else if (activeFilter.value === "language") {
          return movie.language === "ko"; // 한국어 필터
        }
        return true;
      });
    });

    const filterBy = (filter) => {
      activeFilter.value = activeFilter.value === filter ? null : filter;
    };

    return { wishlist, toggleWishlist, activeFilter, filteredWishlist, filterBy };
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

.filter-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-buttons button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  background-color: #333;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.filter-buttons button.active {
  background-color: #e50914;
  color: white;
}

.filter-buttons button:hover {
  background-color: #444;
}

.wishlist-movies {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.wishlist-movie {
  width: 150px;
  height: 300px;
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
  color: white;
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
</style>
