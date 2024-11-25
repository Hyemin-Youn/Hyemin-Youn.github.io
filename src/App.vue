<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';
import Banner from './components/Banner.vue'; // 예시
import Home from './views/Home.vue';


/* eslint-disable */
export default {
  components: {
    Banner,
    Home,
  }
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
#app {
  display: flex;
  flex-direction: column;
  height: 100%;

}


</style>
