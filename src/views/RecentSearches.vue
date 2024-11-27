<template>
    <div class="recent-searches">
      <h3>최근 검색어</h3>
      <ul v-if="recentSearchesSafe.length > 0">
        <li v-for="(search, index) in recentSearchesSafe" :key="index">
          {{ search }}
        </li>
      </ul>
      <p v-else>최근 검색 기록이 없습니다.</p>
    </div>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  
  export default {
    name: "RecentSearches",
    computed: {
      ...mapGetters(["recentSearches"]),
      recentSearchesSafe() {
        return Array.isArray(this.recentSearches) ? this.recentSearches : [];
      },
    },
  };
  </script>
  
  <style scoped>
  .recent-searches {
    margin-top: 20px;
  }
  
  .recent-searches h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    padding: 10px;
    background-color: #222;
    margin-bottom: 10px;
    border-radius: 4px;
    color: white;
  }
  </style>
  