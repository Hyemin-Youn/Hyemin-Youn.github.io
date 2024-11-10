<template>
  <div>
    <h1>Featured Movie</h1>
    <div v-if="featuredMovie">
      <h2>{{ featuredMovie.title }}</h2>
      <p>{{ featuredMovie.overview }}</p>
    </div>
  </div>
</template>

<script>
import URL from '@/URL';

export default {
  name: 'HomePage',
  data() {
    return {
      featuredMovie: null
    };
  },
  async created() {
    try {
      this.featuredMovie = await URL.fetchFeaturedMovie();
    } catch (error) {
      console.error('Error fetching featured movie:', error);
    }
  }
};
</script>
