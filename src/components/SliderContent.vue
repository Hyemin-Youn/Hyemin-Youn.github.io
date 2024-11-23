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
        @click="toggleFavorite(movie)"
      >
        <div class="info">
          <h4>{{ movie.title }}</h4>
          <p>평점: ⭐ {{ movie.vote_average }}</p>
          <p>개봉일: {{ movie.release_date }}</p>
        </div>
        <!-- 찜 표시 -->
        <div v-if="isFavorite(movie)" class="thumbs-up">
          <font-awesome-icon :icon="['fas', 'thumbs-up']" />
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
      currentIndex: 0,
      itemsPerPage: 5,
      favoriteMovies: [], // 내가 찜한 리스트
    };
  },
  computed: {
    displayedMovies() {
      return this.movies.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
    },
  },
  methods: {
    slideLeft() {
      if (this.currentIndex > 0) this.currentIndex--;
    },
    slideRight() {
      if (this.currentIndex + this.itemsPerPage < this.movies.length) this.currentIndex++;
    },
    makeImagePath(path, size) {
      return `https://image.tmdb.org/t/p/${size}${path}`;
    },
    toggleFavorite(movie) {
      const index = this.favoriteMovies.findIndex((m) => m.id === movie.id);
      if (index !== -1) {
        // 이미 찜한 경우 -> 제거
        this.favoriteMovies.splice(index, 1);
      } else {
        // 찜하지 않은 경우 -> 추가
        this.favoriteMovies.push(movie);
      }
    },
    isFavorite(movie) {
      // 현재 영화가 favoriteMovies에 있는지 확인
      return this.favoriteMovies.some((m) => m.id === movie.id);
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
  overflow: hidden;
  flex: 1;
}

.poster {
  flex: 0 0 calc(100% / 5);
  height: 250px;
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

.thumbs-up {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.arrow-btn {
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
}

.arrow-btn:hover {
  background: rgba(0, 0, 0, 0.9);
}
</style>
