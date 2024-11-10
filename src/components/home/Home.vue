<template>
    <div id="app">
      <Header />
      <div id="container">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  import Header from '@/layout/header/Header.vue';
  
  export default {
    components: {
      Header
    }
  };
  </script>
  
  <style scoped>
  #app {
    width: 95vw;
    height: 95vh;
    overflow-x: hidden;
    margin: auto;
  }
  </style>
  