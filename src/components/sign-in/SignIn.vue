<template>
  <div class="wrapper">
    <div class="card" :class="{ flipped: isFlipped }">
      <!-- 로그인 화면 -->
      <div class="content front">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" required />

          <label for="password">Password</label>
          <input id="password" v-model="password" type="password" required />
          <p v-if="loginError" class="error">{{ loginError }}</p>

          <div class="remember-me">
            <input id="rememberMe" v-model="rememberMe" type="checkbox" />
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
          <input id="newEmail" v-model="newEmail" type="email" required />

          <label for="newPassword">Password</label>
          <input id="newPassword" v-model="newPassword" type="password" required />

          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
          />
          <p v-if="signupError" class="error">{{ signupError }}</p>

          <div class="terms">
            <input id="terms" v-model="termsAccepted" type="checkbox" />
            <label for="terms">I have read the Terms and Conditions</label>
          </div>

          <button type="submit" :disabled="!termsAccepted">Register</button>
        </form>
        <p class="switch" @click="flipCard">
          Already have an account? Sign in
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isFlipped: false,
      email: "",
      password: "",
      rememberMe: false,
      loginError: "",
      newEmail: "",
      newPassword: "",
      confirmPassword: "",
      termsAccepted: false,
      signupError: "",
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
    ...mapActions(["login", "register"]), // Vuex의 login과 register 액션 사용

    flipCard() {
      this.isFlipped = !this.isFlipped;
    },

    async handleLogin() {
      // 비밀번호 길이 유효성 검사
      if (this.password.length !== 32) {
        this.loginError = "Password must be exactly 32 characters long.";
        return;
      } else {
        this.loginError = "";
      }

      // Vuex의 login 액션 호출 및 성공 여부 확인
      const success = await this.login({
        email: this.email,
        password: this.password,
      });

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
        this.loginError = "Login failed. Please check your credentials.";
      }
    },

    handleRegister() {
      // 비밀번호 길이 유효성 검사
      if (this.newPassword.length !== 32) {
        this.signupError = "Password must be exactly 32 characters long.";
        return;
      }

      // 비밀번호 일치 확인
      if (this.newPassword !== this.confirmPassword) {
        this.signupError = "Passwords do not match.";
        return;
      } else {
        this.signupError = "";
      }

      if (this.newEmail && this.newPassword && this.termsAccepted) {
        // 회원가입 시 Vuex를 통해 로컬 저장소에 사용자 정보 저장
        this.register({
          email: this.newEmail,
          password: this.newPassword,
        });

        alert("Registration successful!");
        this.isFlipped = false; // 로그인 화면으로 돌아가기
      } else {
        this.signupError = "Registration failed. Please try again.";
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
  width: 400px; /* 로그인 박스 너비 */
  height: 500px; /* 로그인 박스 높이 */
  margin: 0 auto; /* 양쪽 마진을 동일하게 적용하여 박스 중앙 정렬 */
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
  padding: 40px 30px; /* 양쪽 마진 균형 */
  text-align: center;
  background: rgba(212, 0, 255, 0.26);
  color: #fff;
  border-radius: 15px; /* 박스 모서리를 더 둥글게 */
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
  margin-bottom: 25px; /* 제목과 폼 사이 간격을 늘림 */
  font-size: 1.8rem; /* 제목 크기 증가 */
}

label {
  display: block;
  margin-top: 15px; /* 필드 간 간격을 조금 더 넓게 */
}

input {
  width: 100%;
  padding: 12px; /* 입력 필드 높이를 더 넓게 */
  margin-top: 8px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 12px; /* 버튼 크기 증가 */
  background-color: #bf0812;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #a10610;
}

.remember-me,
.terms {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin: 15px 0;
}

.remember-me input[type="checkbox"],
.terms input[type="checkbox"] {
  margin-right: 8px;
  cursor: pointer;
}

.switch {
  margin-top: 20px; /* 스위치 텍스트와 박스 간 간격 증가 */
  color: #fff;
  cursor: pointer;
  text-decoration: underline;
  z-index: 20;
}

.error {
  color: yellow; /* 에러 메시지를 노란색으로 유지 */
  font-size: 0.9rem;
  margin-top: 10px;
}
</style>
