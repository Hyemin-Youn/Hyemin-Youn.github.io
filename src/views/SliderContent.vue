<template>
    <div class="slider-wrapper">
      <!-- 왼쪽 버튼 -->
      <button class="arrow-btn left" @click="increaseLeft">
        <font-awesome-icon :icon="['fas', 'angle-left']" />
      </button>
  
      <!-- 슬라이더 행 -->
      <transition-group
        name="slider"
        tag="div"
        class="row"
        @before-enter="onEnter"
        @after-leave="toggleLeaving"
      >
        <div
          v-for="movie in visibleMovies"
          :key="movie.id"
          class="box"
          :style="{ backgroundImage: `url(${makeImagePath(movie.poster_path, 'w500')})` }"
          @click="onBoxClicked(movie.id)"
        >
          <div class="info">
            <div>
              <h4>{{ movie.title }}</h4>
              <p>
                <span><font-awesome-icon :icon="['fas', 'heart']" /></span>
                <span><font-awesome-icon :icon="['fas', 'share-nodes']" /></span>
              </p>
            </div>
            <p>
              <span class="mini">개봉일</span> {{ movie.release_date }}
              <span class="mini">평점</span> ⭐ {{ movie.vote_average }} 점
            </p>
          </div>
        </div>
      </transition-group>
  
      <!-- 오른쪽 버튼 -->
      <button class="arrow-btn right" @click="increaseRight">
        <font-awesome-icon :icon="['fas', 'angle-right']" />
      </button>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  
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
      const index = ref(0); // 슬라이더 인덱스
      const leaving = ref(false); // 슬라이더 이동 중인지
      const offset = 6; // 한 번에 보여줄 영화 수
  
      // 슬라이더 왼쪽으로 이동
      const increaseLeft = () => {
        if (leaving.value) return;
        toggleLeaving();
        const totalMovies = props.movies.length - 1;
        const maxIndex = Math.floor(totalMovies / offset) - 1;
        index.value = index.value === 0 ? maxIndex : index.value - 1;
      };
  
      // 슬라이더 오른쪽으로 이동
      const increaseRight = () => {
        if (leaving.value) return;
        toggleLeaving();
        const totalMovies = props.movies.length - 1;
        const maxIndex = Math.floor(totalMovies / offset) - 1;
        index.value = index.value === maxIndex ? 0 : index.value + 1;
      };
  
      // 현재 보이는 영화 계산
      const visibleMovies = computed(() => {
        return props.movies.slice(offset * index.value, offset * index.value + offset);
      });
  
      // 슬라이더 이동 중 상태 토글
      const toggleLeaving = () => {
        leaving.value = !leaving.value;
      };
  
      // 박스 클릭 시 상세 페이지 이동
      const onBoxClicked = (movieId) => {
        router.push(`/movies/${movieId}`);
      };
  
      return {
        index,
        leaving,
        increaseLeft,
        increaseRight,
        visibleMovies,
        makeImagePath,
        onBoxClicked,
        toggleLeaving,
      };
    },
  };
  </script>
  
  <style scoped>
  .slider-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  
  .row {
    display: flex;
    gap: 10px;
    transition: transform 1s ease;
  }
  
  .box {
    flex: 0 0 calc(100% / 6 - 10px); /* 한 행에 6개의 박스 */
    height: 450px;
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
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 20px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  
  .arrow-btn.left {
    left: 10px;
  }
  
  .arrow-btn.right {
    right: 10px;
  }
  </style>
  