<template>
  <div class="slider-container">
    <!-- 왼쪽 버튼 -->
    <button class="slide-btn left" @click="scrollLeft">
      <i class="fas fa-chevron-left"></i>
    </button>

    <!-- 슬라이더 콘텐츠 -->
    <div class="slider-content" ref="slider">
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

    <!-- 오른쪽 버튼 -->
    <button class="slide-btn right" @click="scrollRight">
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
</template>

<script>
import { computed, ref } from "vue";
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
    const slider = ref(null); // 슬라이더 참조

    const isInWishlist = (id) => store.getters.isInWishlist(id);

    const toggleWishlist = (movie) => {
      store.dispatch("toggleWishlist", movie);
    };

    const scrollLeft = () => {
      if (slider.value) {
        slider.value.scrollBy({
          left: -300, // 왼쪽으로 300px 이동
          behavior: "smooth",
        });
      }
    };

    const scrollRight = () => {
      if (slider.value) {
        slider.value.scrollBy({
          left: 300, // 오른쪽으로 300px 이동
          behavior: "smooth",
        });
      }
    };

    return { isInWishlist, toggleWishlist, slider, scrollLeft, scrollRight };
  },
};
</script>

<style scoped>
.slider-container {
  position: relative;
  display: flex;
  align-items: center;
}

.slider-content {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 10px 0;
  width: 100%;
}

.movie-card {
  position: relative;
  width: 150px;
  cursor: pointer;
  flex-shrink: 0; /* 카드의 크기가 줄어들지 않도록 설정 */
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

/* 슬라이드 버튼 스타일 */
.slide-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 20px;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s;
}

.slide-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.slide-btn.left {
  left: 10px;
}

.slide-btn.right {
  right: 10px;
}


</style>
