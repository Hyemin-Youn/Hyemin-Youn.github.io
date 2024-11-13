<template>
  <div class="wrapper">
    <div class="card" :class="{ flipped: isFlipped }">
      <!-- 로그인 화면 -->
      <div class="content front">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
          >

          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
          >

          <div class="remember-me">
            <input
              id="rememberMe"
              v-model="rememberMe"
              type="checkbox"
            >
            <label for="rememberMe">Remember Me</label>
          </div>

          <button type="submit">Sign In</button>
        </form>
        <p class="switch" @click="flipCard">
          Don't have an account? Sign up
        </p>
      </div>

      <!-- 회원가입 화면 -->
      <div class="content back">
        <h2>Sign Up</h2>
        <form @submit.prevent="handleRegister">
          <label for="newEmail">Email</label>
          <input
            id="newEmail"
            v-model="newEmail"
            type="email"
            required
          >

          <label for="newPassword">Password</label>
          <input
            id="newPassword"
            v-model="newPassword"
            type="password"
            required
          >

          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
          >

          <div class="terms">
            <input
              id="terms"
              v-model="termsAccepted"
              type="checkbox"
            >
            <label for="terms">I have read the Terms and Conditions</label>
          </div>

          <button
            type="submit"
            :disabled="!termsAccepted"
          >
            Register
          </button>
          <p v-if="passwordError" class="error">{{ passwordError }}</p>
        </form>
        <p class="switch" @click="flipCard">
          Already have an account? Sign in
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isFlipped: false,
      email: "",
      password: "",
      rememberMe: false,
      newEmail: "",
      newPassword: "",
      confirmPassword: "",
      termsAccepted: false,
      passwordError: "",
    };
  },
  mounted() {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    if (rememberMe && savedEmail && savedPassword) {
      this.email = savedEmail;
      this.password = savedPassword;
      this.autoLogin();
    }
  },
  methods: {
    ...mapActions(['login', 'register']), // Vuex의 login과 register 액션 사용

    flipCard() {
      this.isFlipped = !this.isFlipped;
    },
    async handleLogin() {
      const registeredEmail = localStorage.getItem("registeredEmail");
      const registeredPassword = localStorage.getItem("registeredPassword");

      // 입력된 이메일과 비밀번호가 로컬 저장소에 저장된 정보와 일치하는지 확인
      if (this.email === registeredEmail && this.password === registeredPassword) {
        alert("Login successful!");

        // 로그인 정보 저장
        if (this.rememberMe) {
          localStorage.setItem("email", this.email);
          localStorage.setItem("password", this.password);
          localStorage.setItem("rememberMe", this.rememberMe);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
          localStorage.removeItem("rememberMe");
        }

        // Vuex에 사용자 설정
        this.login({ email: this.email });

        // 로그인 후 /home 페이지로 이동
        this.$router.push("/home");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    },
    handleRegister() {
      if (this.newPassword !== this.confirmPassword) {
        this.passwordError = "Passwords do not match.";
        return;
      } else {
        this.passwordError = "";
      }

      if (this.newEmail && this.newPassword && this.termsAccepted) {
        // 회원가입 시 Vuex를 통해 로컬 저장소에 사용자 정보 저장
        this.register({ email: this.newEmail, password: this.newPassword });
        
        alert("Registration successful!");
        this.isFlipped = false; // 로그인 화면으로 돌아가기
      } else {
        alert("Registration failed. Please try again.");
      }
    },
    autoLogin() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
/* 스타일 코드는 기존과 동일하므로 생략 */
</style>
