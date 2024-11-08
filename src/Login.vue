<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
        handleLogin() {
            if (this.email === "user@example.com" && this.password === "password123") {
            localStorage.setItem("isLoggedIn", true);
            this.$router.push("/home"); // 로그인 후 리디렉션
            } else {
            alert("Invalid email or password");
            }
        }
    }
  };
  </script>
  
  <style scoped>
  /* 스타일 추가 */
  </style>
  