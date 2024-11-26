<template>
    <div>
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
      <router-view /> <!-- 라우터에 따라 적절한 컴포넌트 렌더링 -->
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      navigateTo(view) {
        if (view === 'PopularTable') {
          this.$router.push('/popular/table');
        } else {
          this.$router.push('/popular/infinite');
        }
      },
    },
  };
  </script>
  