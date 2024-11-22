<template>
  <div>
    <div class="bg-image" />
    <div class="wrapper">
      <!-- 로그인 카드 -->
      <div
        class="card"
        :class="{ active: activeCard === 'login', backward: activeCard === 'signup' }"
      >
        <div class="content">
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
            <p
              v-if="loginError"
              class="error"
            >
              {{ loginError }}
            </p>

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
            @click="switchToSignup"
          >
            Don't have an account? <b>Sign up</b>
          </p>
        </div>
      </div>

      <!-- 회원가입 카드 -->
      <div
        class="card"
        :class="{ active: activeCard === 'signup', backward: activeCard === 'login' }"
      >
        <div class="content">
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
            <p
              v-if="signupError"
              class="error"
            >
              {{ signupError }}
            </p>

            <div class="terms">
              <input
                id="terms"
                v-model="termsAccepted"
                type="checkbox"
              >
              <label for="terms">I have read the <b>Terms and Conditions</b></label>
            </div>

            <button
              type="submit"
              :disabled="!termsAccepted"
            >
              Register
            </button>
          </form>
          <p
            class="switch"
            @click="switchToLogin"
          >
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
      activeCard: "login", // 현재 활성 카드 (login or signup)
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
      if (this.password.length < 6) {
        this.loginError = "Password must be 32 letters long. Use your API key. ";
        return;
      }
      alert("Login successful!");
      this.$store.dispatch("login", { email: this.email });
      if (this.$route.path !== "/home") {
        this.$router.push("/home");
      }
    },
    handleRegister() {
      if (this.newPassword.length < 6) {
        this.signupError = "Password must be at least 6 characters long.";
        return;
      }
      if (this.newPassword !== this.confirmPassword) {
        this.signupError = "Passwords do not match.";
        return;
      }
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
  background-image: url('https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  z-index: -1;
}

/* 전체 카드 컨테이너 */
.wrapper {
  width: 700px;
  height: 520px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-55%, -50%); /* 화면 중앙에서 약간 왼쪽으로 이동 */
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
}

/* 카드 기본 스타일 */
.card {
  width: 360px;
  height: 480px;
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 0.6s ease-in-out, opacity 0.6s ease-in-out;
  opacity: 0;
  z-index: 0;
}

.card.active {
  opacity: 1;
  z-index: 2; /* 활성 카드 위로 오게 설정 */
  transform: translateX(-20px) scale(1); /* 중앙에서 약간 겹치게 */
}

.card.backward {
  z-index: 1; /* 비활성 카드 아래로 설정 */
  transform: translateX(30px) scale(0.95); /* 약간 오른쪽으로 밀려나게 설정 */
  opacity: 0.5;
}

/* 카드 콘텐츠 */
.content {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 30px;
  text-align: center;
  background: #e50914;
  color: #fff;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

/* 텍스트 스타일 */
h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
}

label {
  display: block;
  margin-top: 10px;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  margin-bottom: 12px;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #bf0812;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
}

button:hover {
  background-color: #a10610;
}

.switch {
  margin-top: 15px;
  color: #fff;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.8rem;
}

.error {
  color: yellow;
  font-size: 0.8rem;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .wrapper {
    width: 90%; /* 화면 너비의 90% */
    height: auto;
    transform: translate(-50%, -50%);
  }

  .card {
    width: 100%; /* 카드가 컨테이너에 딱 맞게 */
    height: auto;
    margin-bottom: 20px; /* 카드 사이 간격 추가 */
    transform: none; /* 애니메이션 효과 제거 */
    opacity: 1; /* 항상 보이도록 설정 */
  }

  .content {
    padding: 15px; /* 내부 여백 줄임 */
    text-align: center; /* 텍스트 중앙 정렬 */
  }

  h2 {
    font-size: 1.2rem; /* 헤더 크기 줄임 */
  }

  label {
    font-size: 0.9rem; /* 라벨 크기 조정 */
  }

  input {
    font-size: 0.9rem;
    padding: 10px;
  }

  button {
    font-size: 0.9rem;
    padding: 10px;
  }

  .switch {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  /* 스마트폰 화면 크기용 */
  .wrapper {
    width: 100%; /* 화면 전체를 사용 */
    padding: 10px;
  }

  .card {
    width: 100%; /* 카드 너비 전체로 */
    margin-bottom: 15px;
  }

  input {
    padding: 8px;
    font-size: 0.85rem; /* 입력 필드 크기 줄임 */
  }

  button {
    padding: 8px;
    font-size: 0.85rem;
  }

  .switch {
    font-size: 0.7rem; /* 하단 스위치 크기 줄임 */
  }
}
</style>
