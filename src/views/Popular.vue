<template>
    <div class="popular">
      <!-- 버튼 컨테이너 -->
      <div class="view-toggle">
        <button
          :class="{ active: $route.name === 'PopularTable' }"
          @click="navigateTo('PopularTable')"
        >
          Table View
        </button>
        <button
          :class="{ active: $route.name === 'PopularInfinite' }"
          @click="navigateTo('PopularInfinite')"
        >
          무한 스크롤 View
        </button>
      </div>
  
      <!-- 영화 포스터 -->
      <div class="movie-grid">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
  
      <!-- 페이지네이션 또는 로딩 -->
      <Pagination v-if="viewMode === 'table'" />
      <div v-if="viewMode === 'infinite'" class="loading">로딩 중...</div>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      viewMode: "table", // 기본 뷰 모드
    };
  },
  methods: {
    navigateTo(view) {
      if (view === "PopularTable") {
        this.$router.push("/popular/table");
      } else {
        this.$router.push("/popular/infinite");
      }
    },
  },
};
</script>

<style scoped>
.popular {
  position: relative;
  padding-top: 60px; /* 상단 여백 */
}

.view-toggle {
  position: absolute;
  top: 10px; /* 포스터 그리드 상단에 배치 */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 1000;
}

.view-toggle button {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.view-toggle button.active {
  background-color: #e50914;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px;
  position: relative;
}

.loading {
  text-align: center;
  margin: 20px 0;
}
</style>

  