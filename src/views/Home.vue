<template>
    <div class="home">
      <BannerComponent :movie="featuredMovie" />
  
      <MovieRowComponent title="인기 영화" :fetchUrl="popularMoviesUrl" />
      <MovieRowComponent title="최신 영화" :fetchUrl="newReleasesUrl" />
      <MovieRowComponent title="액션 영화" :fetchUrl="actionMoviesUrl" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
  import URLService from '@/util/movie/URL'; // URL 서비스 임포트
  import BannerComponent from '@/components/home-main/BannerComponent.vue';
  import MovieRowComponent from '@/components/home-main/MovieRowComponent.vue';
  
  export default {
    components: {
      BannerComponent,
      MovieRowComponent
    },
    setup() {
      const faSearchIcon = faSearch;
      const faUserIcon = faUser;
  
      const apiKey = localStorage.getItem('TMDb-Key') || '';
      const featuredMovie = ref(null);
      const popularMoviesUrl = URLService.getURL4PopularMovies(apiKey);
      const newReleasesUrl = URLService.getURL4ReleaseMovies(apiKey);
      const actionMoviesUrl = URLService.getURL4GenreMovies(apiKey, '28');
  
      const loadFeaturedMovie = async () => {
        featuredMovie.value = await URLService.fetchFeaturedMovie(apiKey);
      };
  
      const initializeScrollListener = () => {
        const handleScroll = () => {
          const header = document.querySelector('.app-header');
          if (window.scrollY > 50) {
            header?.classList.add('scrolled');
          } else {
            header?.classList.remove('scrolled');
          }
        };
        window.addEventListener('scroll', handleScroll);
        onBeforeUnmount(() => {
          window.removeEventListener('scroll', handleScroll);
        });
      };
  
      onMounted(() => {
        loadFeaturedMovie();
        initializeScrollListener();
      });
  
      return {
        faSearchIcon,
        faUserIcon,
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
    display: block;
  }
  
  html,
  body {
    overflow-y: scroll !important;
    background-color: #141414 !important;
  }
  </style>
  