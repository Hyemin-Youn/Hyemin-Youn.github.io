<template>
  <div class="home">
    <Banner :movie="featuredMovie" />

    <MovieRow title="인기 영화" :fetchUrl="popularMoviesUrl" />
    <MovieRow title="최신 영화" :fetchUrl="newReleasesUrl" />
    <MovieRow title="액션 영화" :fetchUrl="actionMoviesUrl" />
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import Banner from '@/views/home-main/Banner.vue';
import MovieRow from '@/views/home-main/MovieRow.vue';
import URL from '@/utils/movie/URL.js';

export default {
  components: {
    Banner,
    MovieRow
  },
  setup() {
    const apiKey = localStorage.getItem('TMDb-Key') || '';
    const featuredMovie = ref(null);
    const popularMoviesUrl = ref('');
    const newReleasesUrl = ref('');
    const actionMoviesUrl = ref('');

    const url = new URL();
    popularMoviesUrl.value = url.getURL4PopularMovies(apiKey);
    newReleasesUrl.value = url.getURL4ReleaseMovies(apiKey);
    actionMoviesUrl.value = url.getURL4GenreMovies(apiKey, '28');

    const loadFeaturedMovie = async () => {
      featuredMovie.value = await url.fetchFeaturedMovie(apiKey);
    };

    const handleScroll = () => {
      const header = document.querySelector('.app-header');
      if (window.scrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    };

    onMounted(() => {
      loadFeaturedMovie();
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
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
:host {
  display: block;
}

html,
body {
  overflow-y: scroll !important;
}

body {
  background-color: #141414 !important;
}
</style>
