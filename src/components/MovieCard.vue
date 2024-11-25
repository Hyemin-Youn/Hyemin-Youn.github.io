<template>
  <div class="movie-card">
    <img :src="posterUrl" :alt="movie.title" class="poster" />
    <div class="movie-info">
      <p class="movie-title">{{ movie.title }}</p>
      <p class="release-date">개봉일: {{ formattedReleaseDate }}</p>
      <div class="movie-rating" v-if="movie.vote_average">
        ⭐ {{ movie.vote_average }} / 10
      </div>
    </div>
    <span class="wishlist-icon">
      <i :class="isInWishlist(movie.id) ? 'fas fa-heart liked' : 'far fa-heart'"></i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
    isInWishlist: {
      type: Function,
      default: () => false, // 기본적으로 위시리스트 여부를 확인하는 함수
    },
  },
  computed: {
    posterUrl() {
      return `https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`;
    },
    formattedReleaseDate() {
      if (!this.movie.release_date) return "개봉일 정보 없음";
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(this.movie.release_date).toLocaleDateString("ko-KR", options);
    },
  },
};
</script>

<style scoped>
.movie-card {
  position: relative;
  width: 150px;
  cursor: pointer;
  flex-shrink: 0; /* 카드 크기 고정 */
  overflow: hidden;
  text-align: center;
  margin: 10px;
}

.poster {
  width: 100%;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;
}

.movie-card:hover .poster {
  transform: scale(1.1); /* Hover 시 이미지 확대 */
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
  opacity: 1; /* Hover 시 정보 표시 */
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
