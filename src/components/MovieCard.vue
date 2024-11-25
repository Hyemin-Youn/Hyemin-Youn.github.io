<template>
  <div class="movie-card">
    <div class="poster-wrapper">
      <img :src="posterUrl" :alt="movie.title" class="poster" />
      <div class="hover-info">
        <p class="rating">⭐ {{ movie.vote_average || "N/A" }} / 10</p>
        <p class="release-date">📅 {{ formattedReleaseDate }}</p>
      </div>
    </div>
    <p class="title">{{ movie.title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
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
  text-align: center;
  margin: 10px;
  position: relative; /* 자식 요소 위치 제어 */
}

.poster-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.poster {
  width: 100%;
  transition: transform 0.3s ease-in-out; /* 이미지 확대 애니메이션 */
}

.movie-card:hover .poster {
  transform: scale(1.1); /* Hover 시 이미지 확대 */
}

.hover-info {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out; /* 애니메이션 */
}

.movie-card:hover .hover-info {
  opacity: 1; /* Hover 시 정보 표시 */
}

.title {
  font-size: 14px;
  margin-top: 8px;
  color: white;
}

.rating {
  font-size: 16px;
  color: gold;
  font-weight: bold;
}

.release-date {
  font-size: 14px;
  color: #ffffff;
  margin-top: 5px;
}
</style>
