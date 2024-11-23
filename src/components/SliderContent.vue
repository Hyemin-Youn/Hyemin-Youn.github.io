<template>
  <div class="slider-wrapper">
    <!-- 왼쪽 화살표 버튼 -->
    <button class="arrow-btn left" @click="slideLeft">
      <font-awesome-icon :icon="['fas', 'angle-left']" />
    </button>

    <!-- 슬라이더 -->
    <div class="slider" :style="{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }">
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="slide"
        :style="{ backgroundImage: `url(${makeImagePath(movie.poster_path, 'w500')})` }"
      >
        <div class="info">
          <h4>{{ movie.title }}</h4>
          <p>평점: ⭐ {{ movie.vote_average }}</p>
          <p>개봉일: {{ movie.release_date }}</p>
        </div>
      </div>
    </div>

    <!-- 오른쪽 화살표 버튼 -->
    <button class="arrow-btn right" @click="slideRight">
      <font-awesome-icon :icon="['fas', 'angle-right']" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0, // 현재 슬라이드 인덱스
      itemsPerPage: 5, // 한 화면에 표시할 영화 개수
      autoSlideTimer: null, // 자동 슬라이드 타이머
    };
  },
  computed: {
    maxIndex() {
      // 한 화면에 표시할 영화 수에 따른 최대 슬라이드 인덱스
      return Math.ceil(this.movies.length / this.itemsPerPage) - 1;
    },
  },
  methods: {
    slideLeft() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.maxIndex; // 마지막 슬라이드로 이동
      }
    },
    slideRight() {
      if (this.currentIndex < this.maxIndex) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0; // 첫 번째 슬라이드로 이동
      }
    },
    makeImagePath(path, size) {
      return `https://image.tmdb.org/t/p/${size}${path}`;
    },
    updateItemsPerPage() {
      if (window.innerWidth <= 480) {
        this.itemsPerPage = 2; // 모바일
      } else if (window.innerWidth <= 768) {
        this.itemsPerPage = 3; // 태블릿
      } else {
        this.itemsPerPage = 5; // 데스크탑
      }
    },
  },
  mounted() {
    this.updateItemsPerPage();
    window.addEventListener("resize", this.updateItemsPerPage);

    this.autoSlideTimer = setInterval(() => {
      this.slideRight();
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.autoSlideTimer);
    window.removeEventListener("resize", this.updateItemsPerPage);
  },
};
</script>

<style scoped>
.slider-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 20px 0;
}

.slider {
  display: flex;
  transition: transform 0.6s ease;
}

.slide {
  flex: 0 0 calc(100% / 5); /* 기본 5개씩 */
  height: 300px;
  background-size: cover;
  background-position: center;
  margin: 0 5px;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.slide:hover {
  transform: scale(1.05);
}

.info {
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  width: 100%;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.slide:hover .info {
  opacity: 1;
}

.arrow-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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
}

.arrow-btn.left {
  left: 10px;
}

.arrow-btn.right {
  right: 10px;
}

.arrow-btn:hover {
  background: rgba(0, 0, 0, 0.9);
}

/* 반응형 스타일 */
@media (max-width: 768px) {
  .slide {
    flex: 0 0 calc(100% / 3); /* 태블릿: 3개씩 */
  }
}

@media (max-width: 480px) {
  .slide {
    flex: 0 0 calc(100% / 2); /* 모바일: 2개씩 */
  }
}
</style>
