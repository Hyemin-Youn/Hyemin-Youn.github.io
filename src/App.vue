<!-- App.vue -->
<template>
  <div id="app">
    <UserLogin />
  </div>
</template>

<script>
import UserLogin from './components/UserLogin.vue';
import HomePage from './components/Home.vue';


export default {
  components: {
    UserLogin, Home
  },
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
