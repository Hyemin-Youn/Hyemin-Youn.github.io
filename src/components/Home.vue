<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <!-- 배너 섹션 -->
    <div class="banner" v-if="bannerMovie">
      <img :src="getImageUrl(bannerMovie.backdrop_path)" alt="banner image" class="banner-image" />
      <div class="banner-info">
        <h1>{{ bannerMovie.title }}</h1>
        <p>{{ bannerMovie.overview }}</p>
        <button>재생</button>
        <button>상세 정보</button>
      </div>
    </div>

    <!-- 인기 영화 섹션 -->
    <section>
      <h2>인기 영화</h2>
      <div class="movies">
        <div v-for="movie in popularMovies" :key="movie.id" class="movie-card">
          <img :src="getImageUrl(movie.poster_path)" alt="movie poster" />
          <p>{{ movie.title }}</p>
        </div>
      </div>
    </section>

    <!-- 현재 상영작 섹션 -->
    <section>
      <h2>현재 상영작</h2>
      <div class="movies">
        <div v-for="movie in nowPlayingMovies" :key="movie.id" class="movie-card">
          <img :src="getImageUrl(movie.poster_path)" alt="movie poster" />
          <p>{{ movie.title }}</p>
        </div>
      </div>
    </section>

    <!-- 장르별 영화 섹션 -->
    <section>
      <h2>장르별 영화</h2>
      <div class="movies">
        <div v-for="movie in genreMovies" :key="movie.id" class="movie-card">
          <img :src="getImageUrl(movie.poster_path)" alt="movie poster" />
          <p>{{ movie.title }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { fetchPopularMovies, fetchNowPlayingMovies, fetchDiscoverMovies } from '../URL';

export default {
  name: 'Home',
  data() {
    return {
      bannerMovie: null,
      popularMovies: [],
      nowPlayingMovies: [],
      genreMovies: [],
    };
  },
  methods: {
    async fetchMovies() {
      try {
        const popularResponse = await fetchPopularMovies();
        const nowPlayingResponse = await fetchNowPlayingMovies();
        const genreResponse = await fetchDiscoverMovies();

        // 각각의 영화 데이터를 배열에 저장
        this.popularMovies = popularResponse.results;
        this.nowPlayingMovies = nowPlayingResponse.results;
        this.genreMovies = genreResponse.results;

        // 배너에 표시할 영화는 인기 영화 중 첫 번째로 설정
        this.bannerMovie = this.popularMovies[0];
      } catch (error) {
        console.error('영화 데이터를 불러오는 중 오류 발생:', error);
      }
    },
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`;
    },
  },
  mounted() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
}
.banner {
  position: relative;
  color: white;
  margin-bottom: 40px;
}
.banner-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}
.banner-info {
  position: absolute;
  bottom: 20px;
  left: 20px;
}
.movies {
  display: flex;
  overflow-x: scroll;
}
.movie-card {
  margin: 10px;
  width: 150px;
}
.movie-card img {
  width: 100%;
  border-radius: 8px;
}
</style>
