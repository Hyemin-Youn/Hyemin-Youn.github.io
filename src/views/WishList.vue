<template>
    <div>
      <Navbar />
      <div class="wishlist">
        <h1>내가 찜한 영화</h1>
        <div v-if="wishlist.length === 0">
          <p>찜한 영화가 없습니다.</p>
        </div>
        <div
v-else
class="wishlist-movies"
>
          <div
            v-for="movie in wishlist"
            :key="movie.id"
            class="movie-card"
          >
            <img
              :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path"
              :alt="movie.title"
              class="movie-poster"
            >
            <div class="movie-info">
              <h4>{{ movie.title }}</h4>
              <p>평점: ⭐ {{ movie.vote_average }}</p>
              <button
                class="remove-btn"
                @click="removeFromWishList(movie.id)"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from "@/components/Navbar.vue";
  import { mapGetters, mapActions } from "vuex";
  
  export default {
    name: "WishList",
    components: {
      Navbar,
    },
    computed: {
      ...mapGetters(["wishlist"]),
    },
    methods: {
      ...mapActions(["removeFromWishList"]),
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
  