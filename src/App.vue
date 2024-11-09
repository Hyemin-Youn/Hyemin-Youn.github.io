<!-- App.vue -->
<template>
  <div id="app">
    <UserLogin />
  </div>
</template>

<script>
import UserLogin from './UserLogin.vue';

export default {
  components: {
    UserLogin,
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
