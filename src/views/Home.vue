<template>
    <div class="home">
      <Navbar />
      <BannerComponent :movie="featuredMovie" />
      <MovieRowComponent title="인기 영화" :fetchUrl="popularMoviesUrl" />
      <MovieRowComponent title="최신 영화" :fetchUrl="newReleasesUrl" />
      <MovieRowComponent title="액션 영화" :fetchUrl="actionMoviesUrl" />
      <Footer />
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  import BannerComponent from '@/components/BannerComponent.vue';
  import MovieRowComponent from '@/components/MovieRowComponent.vue';
  import Footer from '@/components/Footer.vue';
  
  export default {
    components: {
      Navbar,
      BannerComponent,
      MovieRowComponent,
      Footer
    },
    data() {
      return {
        featuredMovie: null,
        popularMoviesUrl: '',
        newReleasesUrl: '',
        actionMoviesUrl: ''
      };
    },
    mounted() {
      // 데이터 로드 로직
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
  