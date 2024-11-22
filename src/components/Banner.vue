<template>
    <div
      class="banner"
      :style="{ backgroundImage: `url(${bannerImage})` }"
    >
      <div class="banner-content">
        <h1 class="banner-title">{{ heroMovie.title }}</h1>
        <p class="banner-description">
          {{ heroMovie.overview || '영화에 대한 설명이 없습니다.' }}
        </p>
        <div class="banner-buttons">
          <button class="banner-button play" @click="playMovie">
            <font-awesome-icon :icon="['fas', 'play']" />
            재생
          </button>
          <button class="banner-button info" @click="showDetails">
            <font-awesome-icon :icon="['fas', 'info-circle']" />
            상세 정보
          </button>
        </div>
      </div>
      <div class="banner-fade"></div>
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
    display: flex;
    align-items: center;
    gap: 10px;
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
  </style>
  