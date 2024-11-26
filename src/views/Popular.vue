<template>
    <div>
      <button @click="viewMode = 'infinite'">무한 스크롤</button>
      <button @click="viewMode = 'table'">테이블 뷰</button>
  
      <PopularInfinite v-if="viewMode === 'infinite'" />
      <PopularTable v-if="viewMode === 'table'" />
    </div>
  </template>
  
  <script>
  import PopularInfinite from "@/views/PopularInfinite.vue";
  import PopularTable from "@/views/PopularTable.vue";
  
  export default {
    components: {
      PopularInfinite,
      PopularTable,
    },
    data() {
      return {
        viewMode: "infinite",
      };
    },
  };
  </script>
  