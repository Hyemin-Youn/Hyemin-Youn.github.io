<template>
  <div class="slider-wrapper">
    <!-- 왼쪽 화살표 버튼 -->
    <button class="arrow-btn left" @click="increaseLeft" :disabled="index === 0">
      <font-awesome-icon :icon="['fas', 'angle-left']" />
    </button>

    <!-- 슬라이더 -->
    <div class="row" :style="{ transform: `translateX(-${index * 100}%)` }">
      <div
        v-for="movie in visibleMovies"
        :key="movie.id"
        class="box"
        :style="{ backgroundImage: `url(${makeImagePath(movie.poster_path, 'w500')})` }"
        @click="onBoxClicked(movie.id)"
      >
        <div class="info">
          <h4>{{ movie.title }}</h4>
          <p>
            개봉일: {{ movie.release_date }}<br />
            평점: ⭐ {{ movie.vote_average }}
          </p>
        </div>
      </div>
    </div>

    <!-- 오른쪽 화살표 버튼 -->
    <button class="arrow-btn right" @click="increaseRight" :disabled="index === maxIndex">
      <font-awesome-icon :icon="['fas', 'angle-right']" />
    </button>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

// 이미지 경로 함수
const makeImagePath = (path, size) => `https://image.tmdb.org/t/p/${size}${path}`;

export default {
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const index = ref(0); // 현재 슬라이더 위치
    const offset = 6; // 한 번에 보여줄 영화 개수
    const maxIndex = computed(() => Math.ceil(props.movies.length / offset) - 1);

    const visibleMovies = computed(() => {
      return props.movies.slice(index.value * offset, (index.value + 1) * offset);
    });

    const increaseLeft = () => {
      if (index.value > 0) index.value -= 1;
    };

    const increaseRight = () => {
      if (index.value < maxIndex.value) index.value += 1;
    };

    const onBoxClicked = (movieId) => {
      router.push(`/movies/${movieId}`);
    };

    return {
      index,
      maxIndex,
      visibleMovies,
      increaseLeft,
      increaseRight,
      onBoxClicked,
      makeImagePath,
    };
  },
};
</script>

<style scoped>
.slider-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 20px 0;
}
.row {
  display: flex;
  transition: transform 0.5s ease;
}
.box {
  flex: 0 0 calc(100% / 6 - 10px); /* 한 행에 6개씩 */
  height: 350px;
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  margin: 0 5px;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.box:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5);
}
.info {
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  width: 100%;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.box:hover .info {
  opacity: 1;
}
.arrow-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 24px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: background-color 0.3s ease, transform 0.3s ease;
  z-index: 10;
}
.arrow-btn:hover {
  background-color: rgba(0, 0, 0, 0.7);
  transform: scale(1.2);
}
.arrow-btn.left {
  left: 10px;
}
.arrow-btn.right {
  right: 10px;
}
.arrow-btn:disabled {
  background-color: rgba(0, 0, 0, 0.1);
  cursor: not-allowed;
}
</style>
