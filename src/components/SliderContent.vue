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

.slider-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
}

.poster-list {
  display: flex;
  gap: 10px;
  overflow: hidden;
  flex: 1;
}

.poster {
  flex: 0 0 calc(100% / 6);
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.poster:hover {
  transform: scale(1.1); /* hover 시 확대 효과 */
  z-index: 2; /* 다른 포스터 위로 올라옴 */
}

.poster.active {
  transform: scale(1.1); /* 클릭된 상태에서도 확대 유지 */
  border: 3px solid #e50914; /* 강조 색상 추가 */
}

.info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  width: 100%;
  box-sizing: border-box; /* 포스터 크기에 정확히 맞춤 */
  padding: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 0 0 8px 8px; /* 포스터 아래 모서리와 일치 */
  overflow: hidden; /* 텍스트가 튀어나오지 않도록 설정 */
}

.poster {
  flex: 0 0 calc(100% / 6); /* 한 화면에 6개 표시 */
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  overflow: hidden; /* 포스터 내부에 모든 내용 제한 */
}


.poster:hover .info,
.poster.active .info {
  opacity: 1; /* hover와 클릭 시 정보 표시 */
}

.arrow-btn {
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;
  margin: 0 10px;
}

.arrow-btn:hover {
  background: rgba(0, 0, 0, 0.9);
}

/* 반응형 스타일 */
@media (max-width: 768px) {
  .poster {
    flex: 0 0 calc(100% / 4); /* 태블릿: 한 화면에 2.5개 표시 (더 넓게) */
    height: 300px; /* 높이를 유지 */
  }
}

@media (max-width: 500px) {
  .poster {
    flex: 0 0 calc(100% / 2); /* 모바일: 한 화면에 1.5개 표시 (더 넓게) */
    height: 280px; /* 높이를 유지 */
  }

  .info {
    font-size: 0.5rem; /* 정보 텍스트 크기 */
    padding: 6px; /* 정보 영역의 여백 */
  }
}

</style>
