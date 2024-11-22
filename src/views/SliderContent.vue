<template>
  <div class="slider-wrapper">
    <!-- 왼쪽 화살표 버튼 -->
    <button class="arrow-btn left" @click="increaseLeft">
      <font-awesome-icon :icon="['fas', 'angle-left']" />
    </button>

    <!-- 슬라이더 -->
    <div class="row" :style="{ transform: `translateX(-${index * 100}%)` }">
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="box"
        :style="{ backgroundImage: `url(${makeImagePath(movie.poster_path, 'w500')})` }"
        @mouseover="hoverMovie(movie)"
        @mouseleave="hoverMovie(null)"
        @click="addToWishlist(movie)"
      >
        <!-- 정보 표시 -->
        <div class="info" v-if="hoveredMovie && hoveredMovie.id === movie.id">
          <h4>{{ movie.title }}</h4>
          <p>개봉일: {{ movie.release_date }}</p>
          <p>평점: ⭐ {{ movie.vote_average }}</p>
        </div>
      </div>
    </div>

    <!-- 오른쪽 화살표 버튼 -->
    <button class="arrow-btn right" @click="increaseRight">
      <font-awesome-icon :icon="['fas', 'angle-right']" />
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

const makeImagePath = (path, size) =>
  `https://image.tmdb.org/t/p/${size}${path}`;

export default {
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const index = ref(0);
    const hoveredMovie = ref(null);

    const hoverMovie = (movie) => {
      hoveredMovie.value = movie;
    };

    const addToWishlist = (movie) => {
      store.dispatch("addToWishList", movie);
    };

    const increaseLeft = () => {
      if (index.value > 0) index.value -= 1;
    };

    const increaseRight = () => {
      const maxIndex = Math.floor(props.movies.length / 6) - 1;
      if (index.value < maxIndex) index.value += 1;
    };

    return {
      index,
      hoveredMovie,
      hoverMovie,
      addToWishlist,
      increaseLeft,
      increaseRight,
      makeImagePath,
    };
  },
};
</script>

<style scoped>
.slider-wrapper {
  overflow: hidden;
  width: 100%;
  position: relative;
}

.row {
  display: flex;
  transition: transform 0.5s ease;
}

.box {
  flex: 0 0 calc(100% / 6 - 10px); /* 한 줄에 6개 */
  margin: 0 5px;
  height: 300px;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.box:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
}

.info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 14px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  opacity: 0.9;
}
</style>
