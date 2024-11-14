<template>
  <div class="wrapper">
    <div
class="card"
:class="{ flipped: isFlipped }"
>
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

          <button type="submit">
Sign In
</button>
        </form>
        <p
class="switch"
@click="flipCard"
>
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
          <p
v-if="passwordError"
class="error"
>
{{ passwordError }}
</p>
        </form>
        <p
class="switch"
@click="flipCard"
>
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
      // Vuex의 login 액션 호출 및 성공 여부 확인
      const success = await this.login({ email: this.email, password: this.password });

      if (success) {
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
.wrapper {
  height: 460px;
  width: 320px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  perspective: 1000px;
  backdrop-filter: blur(5px);
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s ease-in-out;
}

.card.flipped {
  transform: rotateY(180deg);
}

.content {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 40px 20px;
  text-align: center;
  background: rgba(212, 0, 255, 0.26);
  color: #fff;
  border-radius: 10px;
  backface-visibility: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15);
  z-index: 10;
}

.front {
  background: #e50914;
}

.back {
  background: #e50914;
  transform: rotateY(180deg);
}

h2 {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-top: 10px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #bf0812;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.remember-me,
.terms {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin: 10px 0;
}

.remember-me input[type="checkbox"],
.terms input[type="checkbox"] {
  margin-right: 5px;
  cursor: pointer;
}

.switch {
  margin-top: 15px;
  color: #fff;
  cursor: pointer;
  text-decoration: underline;
  z-index: 20;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
}
</style>
