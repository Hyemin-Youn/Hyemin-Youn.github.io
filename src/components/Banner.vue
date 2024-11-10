<template>
  <div class="hero">
    <img
      :src="heroImage"
      alt="Hero Movie"
      class="hero-image"
    >
    <div class="hero-content">
      <h2>{{ heroMovie.title }}</h2>
      <p>{{ heroMovie.overview }}</p>
      <div class="button-group">
        <button
          class="play-button"
          @click="playMovie"
        >
          재생
        </button>
        <button
          class="detail-button"
          @click="goToDetail(heroMovie.id)"
        >
          상세 정보
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: 'Banner',
    props: {
      heroMovie: {
        type: Object,
        required: true
      }
    },
    computed: {
      heroImage() {
        return this.heroMovie.backdrop_path
          ? `https://image.tmdb.org/t/p/original${this.heroMovie.backdrop_path}`
          : '';
      }
    },
    methods: {
      goToDetail(movieId) {
        this.$router.push(`/movie/${movieId}`);
      },
      playMovie() {
        // 재생 기능 구현 (예: 팝업, 플레이어로 이동 등)
        console.log("영화 재생");
      }
    }
  };
  </script>
  
  <style scoped>
  .hero {
    position: relative;
    height: 60vh;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.4);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  
  .hero-content {
    position: relative;
    max-width: 800px;
    color: #fff;
    text-align: left;
    padding: 20px;
  }
  
  .hero-content h2 {
    font-size: 2.5em;
    margin-bottom: 10px;
  }
  
  .hero-content p {
    font-size: 1.2em;
    line-height: 1.4;
    margin-bottom: 20px;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
  }
  
  .play-button,
  .detail-button {
    padding: 10px 20px;
    font-size: 1em;
    border: none;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .play-button {
    background-color: #e50914;
  }
  
  .detail-button {
    background-color: rgba(109, 109, 110, 0.7);
  }
  </style>
  