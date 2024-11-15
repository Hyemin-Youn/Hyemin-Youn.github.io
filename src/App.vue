<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import '@fortawesome/fontawesome-free/css/all.css';
import SignIn from './components/sign-in/SignIn.vue';




/* eslint-disable */
export default {
  components: {
    Navbar,
    SignIn,
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
</style>
