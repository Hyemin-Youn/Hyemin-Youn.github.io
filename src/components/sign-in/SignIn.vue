<template>
  <div>
    <div class="bg-image"></div>
    <div class="wrapper">
      <!-- 로그인 카드 -->
      <div class="card" :class="{ active: activeCard === 'login', backward: activeCard === 'signup' }">
        <div class="content">
          <h2>Sign In</h2>
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
          <p class="switch" @click="switchToSignup">
            Don't have an account? <b>Sign up</b>
          </p>
        </div>
      </div>

      <!-- 회원가입 카드 -->
      <div class="card" :class="{ active: activeCard === 'signup', backward: activeCard === 'login' }">
        <div class="content">
          <h2>Sign Up</h2>
          <form @submit.prevent="handleRegister">
            <label for="newEmail">Email</label>
            <input id="newEmail" v-model="newEmail" type="email" required />

            <label for="newPassword">Password</label>
            <input id="newPassword" v-model="newPassword" type="password" required />

            <label for="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" v-model="confirmPassword" type="password" required />
            <p v-if="signupError" class="error">{{ signupError }}</p>

            <div class="terms">
              <input id="terms" v-model="termsAccepted" type="checkbox" />
              <label for="terms">I have read the <b>Terms and Conditions</b></label>
            </div>

            <button type="submit" :disabled="!termsAccepted">Register</button>
          </form>
          <p class="switch" @click="switchToLogin">
            Already have an account? <b>Sign in</b>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeCard: "login", // 초기 활성 카드
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
  methods: {
    switchToSignup() {
      this.activeCard = "signup";
    },
    switchToLogin() {
      this.activeCard = "login";
    },
    handleLogin() {
      alert("Login successful!");
    },
    handleRegister() {
      alert("Registration successful!");
      this.switchToLogin();
    },
  },
};
</script>

<style scoped>
/* 배경 이미지 */
.bg-image {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=2574&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  z-index: -1;
}

/* 전체 카드 컨테이너 */
.wrapper {
  position: relative;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  height: 500px; /* 카드 컨테이너 높이 조정 */
}

/* 카드 스타일 */
.card {
  width: 100%;
  max-width: 400px;
  position: absolute;
  background: #e50914;
  padding: 30px; /* 내부 여백 조정 */
  border-radius: 10px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease, opacity 0.5s ease;
  opacity: 0;
  transform: translateX(100%);
  height: 450px; /* 카드 높이 증가 */
}

.card.active {
  opacity: 1;
  transform: translateX(0);
  z-index: 10;
}

.card.backward {
  opacity: 0;
  transform: translateX(-100%);
  z-index: 5;
}

/* 카드 콘텐츠 */
.content {
  text-align: center;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

label {
  display: block;
  text-align: left;
  margin: 10px 0 5px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 12px; /* 버튼 크기 조정 */
  background: #bf0812;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 15px; /* 버튼 간 간격 조정 */
}

button:disabled {
  background: #a6a6a6;
}

.switch {
  margin-top: 15px;
  font-size: 0.9rem;
  cursor: pointer;
  color: white;
  text-decoration: under

