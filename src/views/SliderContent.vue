<template>
    <div class="slider-wrapper">
      <!-- 왼쪽 버튼 -->
      <button class="arrow-btn left" @click="increaseLeft">
        <font-awesome-icon :icon="['fas', 'angle-left']" />
      </button>
  
      <!-- 슬라이더 행 -->
      <div class="row">
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
              <span><font-awesome-icon :icon="['fas', 'heart']" /></span>
              <span><font-awesome-icon :icon="['fas', 'share-nodes']" /></span>
            </p>
            <p>
              <span class="mini">개봉일</span> {{ movie.release_date }}
              <span class="mini">평점</span> ⭐ {{ movie.vote_average }} 점
            </p>
          </div>
        </div>
      </div>
  
      <!-- 오른쪽 버튼 -->
      <button class="arrow-btn right" @click="increaseRight">
        <font-awesome-icon :icon="['fas', 'angle-right']" />
      </button>
    </div>
  </template>
  
  <script>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  
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
      const router = useRouter();
      const index = ref(0); // 슬라이더의 현재 인덱스
      const offset = 6; // 한 번에 보여줄 영화 수
  
      // 현재 보여질 영화 계산
      const visibleMovies = computed(() => {
        return props.movies.slice(
          offset * index.value,
          offset * index.value + offset
        );
      });
  
      // 슬라이더 왼쪽 이동
      const increaseLeft = () => {
        index.value =
          index.value === 0
            ? Math.floor((props.movies.length - 1) / offset)
            : index.value - 1;
      };
  
      // 슬라이더 오른쪽 이동
      const increaseRight = () => {
        index.value =
          index.value === Math.floor((props.movies.length - 1) / offset)
            ? 0
            : index.value + 1;
      };
  
      // 영화 클릭 시 상세 페이지 이동
      const onBoxClicked = (movieId) => {
        router.push(`/movies/${movieId}`);
      };
  
      return {
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
    gap: 10px;
    transition: transform 0.5s ease;
  }
  
  .box {
    flex: 0 0 calc(100% / 6 - 10px); /* 한 행에 6개의 박스 */
    height: 300px;
    background-size: cover;
    background-position: center;
    border-radius: 6px;
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
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    z-index: 10;
  }
  
  .arrow-btn:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
  
  .arrow-btn.left {
    left: 10px;
  }
  
  .arrow-btn.right {
    right: 10px;
  }
  </style>
  