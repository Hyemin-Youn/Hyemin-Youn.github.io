<template>
  <div class="banner">
    <img
      :src="bannerImage"
      alt="Hero Movie"
      class="banner-image"
    >
    <div class="banner-content">
      <h2>{{ heroMovie.title }}</h2>
      <p>{{ heroMovie.overview }}</p>
      <button @click="playMovie">
        재생
      </button>
      <button @click="showDetails">
        상세 정보
      </button>
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
        bannerImage() {
            return this.heroMovie.backdrop_path
                ? `https://image.tmdb.org/t/p/original${this.heroMovie.backdrop_path}`
                : '';
        }
    },
    methods: {
        playMovie() {
            console.log('Play movie:', this.heroMovie.title);
        },
        showDetails() {
            this.$router.push(`/movie/${this.heroMovie.id}`);
        }
    }
};
</script>

<style scoped>
.banner {
    position: relative;
    height: 60vh;
    color: #fff;
    margin-bottom: 20px;
}

.banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.6);
}

.banner-content {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: #fff;
}

.banner-content h2 {
    font-size: 1em;
    margin-bottom: 10px;
}

.banner-content p {
    font-size: 1em;
    max-width: 50%;
}

.banner-content button {
    padding: 10px 20px;
    font-size: 1em;
    background-color: #e50914;
    border: none;
    color: #fff;
    cursor: pointer;
    margin-top: 10px;
}
</style>