<template>
    <div
      class="banner"
      :style="{ backgroundImage: `url(${bannerImage})` }"
    >
      <div class="banner-content">
<<<<<<< HEAD
        <h1 class="banner-title">{{ heroMovie.title }}</h1>
=======
        <h1 class="banner-title">
{{ heroMovie.title }}
</h1>
>>>>>>> main
        <p class="banner-description">
          {{ heroMovie.overview || "영화에 대한 설명이 없습니다." }}
        </p>
        <div class="banner-buttons">
<<<<<<< HEAD
          <button class="banner-button play" @click="playMovie">
            재생
          </button>
          <button class="banner-button info" @click="showDetails">
=======
          <button
class="banner-button play"
@click="playMovie"
>
            재생
          </button>
          <button
class="banner-button info"
@click="showDetails"
>
>>>>>>> main
            상세 정보
          </button>
        </div>
      </div>
<<<<<<< HEAD
      <div class="banner-fade"></div>
=======
      <div class="banner-fade" />
>>>>>>> main
    </div>
  </template>
  
  <script>
  export default {
    name: "Banner",
    props: {
      heroMovie: {
        type: Object,
        required: true,
      },
    },
    computed: {
      bannerImage() {
        return this.heroMovie.backdrop_path
          ? `https://image.tmdb.org/t/p/original${this.heroMovie.backdrop_path}`
          : "";
      },
    },
    methods: {
      playMovie() {
        console.log("Play movie:", this.heroMovie.title);
      },
      showDetails() {
        if (this.heroMovie.id) {
          this.$router.push(`/movie/${this.heroMovie.id}`);
        } else {
          console.error("Movie ID is not available");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* 기본 배너 스타일 */
  .banner {
    position: relative;
    height: 70vh;
    color: #fff;
    display: flex;
    align-items: flex-end;
    padding: 20px;
    background-size: cover;
    background-position: center;
  }
  
  .banner-content {
    z-index: 10;
    max-width: 50%;
  }
  
  .banner-title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .banner-description {
    font-size: 1.2rem;
    line-height: 1.5;
    margin-bottom: 20px;
  }
  
  .banner-buttons {
    display: flex;
    gap: 10px;
  }
  
  .banner-button {
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: transform 0.2s ease-in-out;
  }
  
  .banner-button.play {
    background-color: #e50914;
    color: white;
  }
  
  .banner-button.info {
    background-color: rgba(109, 109, 110, 0.7);
    color: white;
  }
  
  .banner-button:hover {
    transform: scale(1.05);
  }
  
  .banner-fade {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 15%;
    background-image: linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111);
  }
  
  /* 반응형 스타일 추가 */
  @media (max-width: 768px) {
    .banner {
      height: 50vh; /* 모바일에서 배너 크기를 줄임 */
      align-items: center;
      text-align: center;
    }
  
    .banner-content {
      max-width: 90%;
      padding: 0 10px;
    }
  
    .banner-title {
      font-size: 1.8rem;
    }
  
    .banner-description {
      font-size: 1rem;
    }
  
    .banner-buttons {
      justify-content: center;
      flex-wrap: wrap;
    }
  
    .banner-button {
      width: 100px;
      padding: 8px 15px;
      font-size: 0.9rem;
    }
  }
  </style>
  