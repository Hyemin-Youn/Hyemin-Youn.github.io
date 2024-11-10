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
import Banner from '@/components/Banner.vue';
import MovieRow from '@/components/MovieRow.vue';
import URLService from '@/util/movie/URL';

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

    const urlService = new URLService();
    popularMoviesUrl.value = urlService.getURL4PopularMovies(apiKey);
    newReleasesUrl.value = urlService.getURL4ReleaseMovies(apiKey);
    actionMoviesUrl.value = urlService.getURL4GenreMovies(apiKey, '28');

    const loadFeaturedMovie = async () => {
      featuredMovie.value = await urlService.fetchFeaturedMovie(apiKey);
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
