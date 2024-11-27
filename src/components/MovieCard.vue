<template>
  <div class="movie-card">
<<<<<<< HEAD
    <img :src="posterUrl" :alt="movie.title" class="poster" />
    <div class="movie-info">
      <p class="movie-title">{{ movie.title }}</p>
      <p class="release-date">개봉일: {{ formattedReleaseDate }}</p>
      <div class="movie-rating" v-if="movie.vote_average">
        ⭐ {{ movie.vote_average }} / 10
      </div>
    </div>
    <span class="wishlist-icon" @click.stop="handleWishlist">
      <i :class="isInWishlist(movie.id) ? 'fas fa-heart liked' : 'far fa-heart'"></i>
=======
    <img
:src="posterUrl"
:alt="movie.title"
class="poster"
>
    <div class="movie-info">
      <p class="movie-title">
{{ movie.title }}
</p>
      <p class="release-date">
개봉일: {{ formattedReleaseDate }}
</p>
      <div
v-if="movie.vote_average"
class="movie-rating"
>
        ⭐ {{ movie.vote_average }} / 10
      </div>
    </div>
    <span
class="wishlist-icon"
@click.stop="handleWishlist"
>
      <i :class="isInWishlist(movie.id) ? 'fas fa-heart liked' : 'far fa-heart'" />
>>>>>>> main
    </span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["isInWishlist"]), // Vuex getter 연결
    posterUrl() {
      return `https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`;
    },
    formattedReleaseDate() {
      if (!this.movie.release_date) return "알 수 없음";
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(this.movie.release_date).toLocaleDateString("ko-KR", options);
    },
  },
  methods: {
    ...mapActions(["toggleWishlist"]), // Vuex action 연결
    handleWishlist() {
      this.toggleWishlist(this.movie); // 영화 추가/삭제 토글
    },
  },
};
</script>

<style scoped>
.movie-card {
  position: relative;
  width: 150px;
  cursor: pointer;
  flex-shrink: 0;
  overflow: hidden;
  text-align: center;
}

.poster {
  width: 100%;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;
}

.movie-card:hover .poster {
  transform: scale(1.1);
}

.movie-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.movie-card:hover .movie-info {
  opacity: 1;
}

.movie-title {
  font-size: 14px;
  color: white;
  margin-bottom: 5px;
}

.release-date {
  font-size: 12px;
  color: #b3b3b3;
  margin-bottom: 5px;
}

.movie-rating {
  font-size: 12px;
  color: gold;
}

.wishlist-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
  color: white;
}

.wishlist-icon .liked {
  color: #e50914;
}
</style>
