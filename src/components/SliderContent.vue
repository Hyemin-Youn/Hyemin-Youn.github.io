<template>
  <div class="slider-wrapper">
    <!-- 왼쪽 화살표 버튼 -->
    <button class="arrow-btn left" @click="slideLeft">
      <font-awesome-icon :icon="['fas', 'angle-left']" />
    </button>

    <!-- 영화 포스터 리스트 -->
    <div class="poster-list">
      <div
        v-for="movie in displayedMovies"
        :key="movie.id"
        class="poster"
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
      currentIndex: 0, // 현재 표시할 첫 영화의 인덱스
      itemsPerPage: 6, // 한 화면에 표시할 영화 개수
    };
  },
  computed: {
    displayedMovies() {
      // 현재 인덱스부터 itemsPerPage만큼의 영화 표시
      return this.movies.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
    },
  },
  methods: {
    slideLeft() {
      // 현재 인덱스가 0보다 크다면 왼쪽으로 이동
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    slideRight() {
      // 현재 인덱스가 영화 목록의 끝에 도달하지 않았다면 오른쪽으로 이동
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
.slider-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.poster-list {
  display: flex;
  gap: 10px;
  overflow: hidden; /* 스크롤 바 제거 */
}

.poster {
  flex: 0 0 calc(100% / 6); /* 한 화면에 6개 표시 */
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
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

.poster:hover .info {
  opacity: 1;
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
}

.arrow-btn:hover {
  background: rgba(0, 0, 0, 0.9);
}

/* 반응형 스타일 */
@media (max-width: 768px) {
  .poster {
    flex: 0 0 calc(100% / 4); /* 태블릿: 4개씩 */
    height: 300px; /* 높이를 줄이기 */
  }
}

@media (max-width: 480px) {
  .poster {
    flex: 0 0 calc(100% / 2); /* 모바일: 2개씩 */
    height: 250px; /* 모바일용 높이 설정 */
  }
}
</style>

