<template>
  <div class="slider-wrapper">
    <!-- 왼쪽 화살표 버튼 -->
    <button class="arrow-btn left" @click="slideLeft">
      <font-awesome-icon :icon="['fas', 'angle-left']" />
    </button>

    <!-- 영화 슬라이더 -->
    <div class="slider" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div
        v-for="(movie, index) in movies"
        :key="index"
        class="movie"
        :style="{ backgroundImage: `url(${makeImagePath(movie.poster_path, 'w500')})` }"
      >
        <div class="info">
          <h4>{{ movie.title }}</h4>
          <p>
            <span><font-awesome-icon :icon="['fas', 'heart']" /></span>
            <span><font-awesome-icon :icon="['fas', 'share-nodes']" /></span>
          </p>
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
      currentIndex: 0, // 현재 슬라이더 인덱스
      visibleMovies: 6, // 한 번에 보여줄 영화 수
    };
  },
  methods: {
    slideLeft() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    slideRight() {
      const maxIndex = Math.ceil(this.movies.length / this.visibleMovies) - 1;
      if (this.currentIndex < maxIndex) {
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
  overflow: hidden;
  width: 100%;
  height: 300px;
}

.slider {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.movie {
  flex: 0 0 calc(100% / 6);
  height: 300px;
  background-size: cover;
  background-position: center;
  margin: 0 5px;
  border-radius: 5px;
  position: relative;
}

.arrow-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
  padding: 10px;
  border-radius: 50%;
}

.arrow-btn.left {
  left: 10px;
}

.arrow-btn.right {
  right: 10px;
}

.info {
  position: absolute;
  bottom: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  width: calc(100% - 20px);
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.movie:hover .info {
  opacity: 1;
}
</style>
