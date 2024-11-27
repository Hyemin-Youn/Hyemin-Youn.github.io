<template>
  <div class="slider-container">
    <button
class="arrow-btn left"
@click="scrollLeft"
>
      <i class="fas fa-chevron-left" />
    </button>

    <div
ref="slider"
class="slider-content"
>
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>

    <button
class="arrow-btn right"
@click="scrollRight"
>
      <i class="fas fa-chevron-right" />
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import MovieCard from "@/components/MovieCard.vue";

export default {
  components: {
    MovieCard,
  },
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const slider = ref(null);

    const scrollLeft = () => {
      if (slider.value) {
        slider.value.scrollBy({ left: -300, behavior: "smooth" });
      }
    };

    const scrollRight = () => {
      if (slider.value) {
        slider.value.scrollBy({ left: 300, behavior: "smooth" });
      }
    };

    return { slider, scrollLeft, scrollRight };
  },
};
</script>

<style scoped>
/* 슬라이더 컨테이너 */
.slider-container {
  position: relative;
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 0 40px; /* 버튼 바깥쪽 위치를 확보하기 위한 여백 */
}

/* 슬라이더 콘텐츠 */
.slider-content {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 10px 0;
  width: 100%;
  scrollbar-width: none; /* Firefox 스크롤바 숨기기 */
}

.slider-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge 스크롤바 숨기기 */
}

/* 카드 스타일 */
.movie-card {
  position: relative;
  width: 150px;
  cursor: pointer;
  flex-shrink: 0; /* 카드 크기 고정 */
  overflow: hidden;
}

.movie-card img {
  width: 100%;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;
}

.movie-card:hover img {
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

/* 화살표 버튼 스타일 */
.arrow-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 20px;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s;
}

.arrow-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

/* 왼쪽 화살표 버튼 */
.arrow-btn.left {
  left: -10px; /* 컨테이너 왼쪽 바깥쪽에 위치 */
}

/* 오른쪽 화살표 버튼 */
.arrow-btn.right {
  right: -10px; /* 컨테이너 오른쪽 바깥쪽에 위치 */
}

/* 좋아요 아이콘 */
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
