<template>
    <div class="slider-content">
      <!-- 왼쪽 화살표 -->
      <button class="arrow left" @click="increaseLeft">
        <font-awesome-icon :icon="['fas', 'angle-left']" />
      </button>
  
      <!-- 영화 리스트 -->
      <transition-group
        name="slide"
        class="row"
        tag="div"
        :key="index"
      >
        <div
          v-for="movie in displayedMovies"
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
              <span class="mini">평점</span>⭐ {{ movie.vote_average }} 점
            </p>
          </div>
        </div>
      </transition-group>
  
      <!-- 오른쪽 화살표 -->
      <button class="arrow right" @click="increaseRight">
        <font-awesome-icon :icon="['fas', 'angle-right']" />
      </button>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import {
    faAngleLeft,
    faAngleRight,
    faHeart,
    faShareNodes,
  } from '@fortawesome/free-solid-svg-icons';
  
  // FontAwesome 설정
  library.add(faAngleLeft, faAngleRight, faHeart, faShareNodes);
  
  export default {
    name: 'SliderContent',
    components: {
      FontAwesomeIcon,
    },
    props: {
      movies: {
        type: Array,
        required: true,
      },
    },
    setup(props) {
      const index = ref(0);
      const offset = 6;
  
      // 현재 보여줄 영화 리스트 계산
      const displayedMovies = computed(() => {
        const start = offset * index.value;
        return props.movies.slice(start, start + offset);
      });
  
      // 오른쪽 이동
      const increaseRight = () => {
        const totalMovies = props.movies.length;
        const maxIndex = Math.floor(totalMovies / offset);
        index.value = (index.value + 1) % maxIndex;
      };
  
      // 왼쪽 이동
      const increaseLeft = () => {
        const totalMovies = props.movies.length;
        const maxIndex = Math.floor(totalMovies / offset);
        index.value = index.value === 0 ? maxIndex - 1 : index.value - 1;
      };
  
      // 영화 상세 보기
      const onBoxClicked = (movieId) => {
        console.log(`Navigating to movie with ID: ${movieId}`);
        // Vue Router 사용 시 다음 코드로 대체
        // this.$router.push(`/movies/${movieId}`);
      };
  
      // 이미지 경로 생성
      const makeImagePath = (path, size) => `https://image.tmdb.org/t/p/${size}${path}`;
  
      return {
        index,
        displayedMovies,
        increaseRight,
        increaseLeft,
        onBoxClicked,
        makeImagePath,
      };
    },
  };
  </script>
  
  <style scoped>
  .slider-content {
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  
  .arrow {
    position: absolute;
    top: 50%;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: 10px;
  }
  
  .arrow.left {
    left: 10px;
    transform: translateY(-50%);
  }
  
  .arrow.right {
    right: 10px;
    transform: translateY(-50%);
  }
  
  .row {
    display: flex;
    transition: transform 0.5s ease;
    gap: 15px;
  }
  
  .box {
    width: 150px;
    height: 225px;
    background-size: cover;
    background-position: center center;
    border-radius: 6px;
    position: relative;
    cursor: pointer;
  }
  
  .info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    padding: 10px;
    opacity: 0;
    transition: opacity 0.3s;
    color: white;
  }
  
  .box:hover .info {
    opacity: 1;
  }
  
  .mini {
    font-size: 0.8em;
    margin-right: 5px;
  }
  </style>
  