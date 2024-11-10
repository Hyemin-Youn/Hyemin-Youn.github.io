<template>
    <div class="home">
      <!-- 네비게이션 바 -->
      <Navbar />
  
      <!-- 배너 컴포넌트 -->
      <BannerComponent :movie="featuredMovie" />
  
      <!-- 영화 목록 행 -->
      <MovieRowComponent title="인기 영화" :fetchUrl="popularMoviesUrl" />
      <MovieRowComponent title="최신 영화" :fetchUrl="newReleasesUrl" />
      <MovieRowComponent title="액션 영화" :fetchUrl="actionMoviesUrl" />
  
      <!-- 푸터 컴포넌트 -->
      <Footer />
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import Navbar from '@/components/Navbar.vue';
//   import BannerComponent from '@/components/home-main/BannerComponent.vue';
//   import MovieRowComponent from '@/components/home-main/MovieRowComponent.vue';
  import Footer from '@/components/Footer.vue';
//   import URLService from '@/util/movie/URL'; // URL 서비스 임포트
  
  export default {
    components: {
      Navbar,
      BannerComponent,
      MovieRowComponent,
      Footer
    },
    setup() {
      const featuredMovie = ref(null);
      const popularMoviesUrl = URLService.getURL4PopularMovies(localStorage.getItem('TMDb-Key'));
      const newReleasesUrl = URLService.getURL4ReleaseMovies(localStorage.getItem('TMDb-Key'));
      const actionMoviesUrl = URLService.getURL4GenreMovies(localStorage.getItem('TMDb-Key'), '28');
  
      const loadFeaturedMovie = async () => {
        featuredMovie.value = await URLService.fetchFeaturedMovie(localStorage.getItem('TMDb-Key'));
      };
  
      onMounted(() => {
        loadFeaturedMovie();
      });
  
      return {
        featuredMovie,
        popularMoviesUrl,
        newReleasesUrl,
        actionMoviesUrl
      };
    }
  };
  </script>
  
  <style scoped>
  .home {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #141414;
  }
  </style>
  