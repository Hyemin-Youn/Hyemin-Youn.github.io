<template>
  <div class="slider-wrapper">
    <!-- 왼쪽 화살표 버튼 -->
    <button class="arrow-btn left" @click="slideLeft">
      <font-awesome-icon :icon="['fas', 'angle-left']" />
    </button>

    <!-- 영화 포스터 리스트 -->
    <div class="poster-list">
      <div
        v-for="(movie, index) in displayedMovies"
        :key="movie.id"
        class="poster"
        :style="{ backgroundImage: `url(${makeImagePath(movie.poster_path, 'w500')})` }"
        @mouseenter="hoverMovie(index)"   
        @mouseleave="unhoverMovie(index)" 
        @click="toggleMovieHover(index)" 
        :class="{ active: isHovered[index] }" 
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
      isHovered: {}, // hover 상태 저장
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
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    slideRight() {
      if (this.currentIndex + this.itemsPerPage < this.movies.length) {
        this.currentIndex++;
      }
    },
    makeImagePath(path, size) {
      return `https://image.tmdb.org/t/p/${size}${path}`;
    },
    hoverMovie(index) {
      this.$set(this.isHovered, index, true); // 마우스 오버 시 상태 변경
    },
    unhoverMovie(index) {
      this.$set(this.isHovered, index, false); // 마우스 아웃 시 상태 변경
    },
    toggleMovieHover(index) {
      this.$set(this.isHovered, index, !this.isHovered[index]); // 클릭 시 상태 토글
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
  background: rgba(0, 0, 0, 0.8);
  color: white;
  width: 100%;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  text-align: center;
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
    flex: 0 0 calc(100% / 3); /* 태블릿: 한 화면에 3개 표시 */
    height: 300px; /* 높이를 늘리기 */
  }
}

@media (max-width: 480px) {
  .poster {
    flex: 0 0 calc(100% / 2); /* 모바일: 한 화면에 2개 표시 */
    height: 280px; /* 높이 늘리기 */
    font-size: 14px; /* 글씨 크기를 약간 키움 */
  }

  .info {
    font-size: 0.9rem; /* 정보 텍스트 크기 */
    padding: 8px; /* 정보 영역의 여백 */
  }
}

</style>
