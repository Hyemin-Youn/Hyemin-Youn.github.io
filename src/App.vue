<template>
  <div id="app">
    <Navbar v-if="!$route.meta.hideNavbar" />
    <router-view />
    <SliderContent/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import '@fortawesome/fontawesome-free/css/all.css';
// import SignIn from './components/sign-in/SignIn.vue';
import Banner from './components/Banner.vue'; // 예시
import Home from './views/Home.vue';



/* eslint-disable */
export default {
  components: {
    Navbar,
    Banner,
    Home
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
  margin-top: 60px;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

</style>
