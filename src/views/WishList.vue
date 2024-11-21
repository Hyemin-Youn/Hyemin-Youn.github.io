<template>
  <div class="wishlist">
    <h2>내가 찜한 리스트</h2>
    <div class="movie-list">
      <div v-for="movie in wishlist" :key="movie.id" class="movie-card">
        <img
          :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path"
          :alt="movie.title"
          class="movie-poster"
        />
        <button @click="removeFromWishlist(movie.id)" class="remove-btn">
          ✖
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Wishlist',
  computed: {
    ...mapGetters(['wishlist']),
  },
  methods: {
    ...mapActions(['removeFromWishList']),
  },
};
</script>


  
  <style scoped>
  .wishlist {
    padding: 20px;
  }
  
  .wishlist-movies {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .movie-card {
    width: 150px;
    text-align: center;
  }
  
  .movie-poster {
    width: 100%;
    border-radius: 10px;
  }
  
  .remove-btn {
    background-color: #e50914;
    color: white;
    border: none;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  