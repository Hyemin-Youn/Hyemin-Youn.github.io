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
      this.triggerCardAnimation();
    },
    switchToLogin() {
      this.activeCard = "login";
      this.triggerCardAnimation();
    },
    triggerCardAnimation() {
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        if (card.classList.contains("active")) {
          card.classList.remove("active");
          card.classList.add("backward");
        } else {
          card.classList.remove("backward");
          card.classList.add("enter");
          setTimeout(() => {
            card.classList.remove("enter");
            card.classList.add("active");
          }, 1000); // 애니메이션 시간을 1초로 설정
        }
      });
    },
    handleLogin() {
      if (this.password.length < 6) {
        this.loginError = "Password must be at least 6 characters long.";
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
  background-image: url('https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=2574&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  z-index: -1;
}

/* 컨테이너 */
.wrapper {
  width: 90%; /* 화면 크기 대비 90%로 설정 */
  max-width: 400px; /* 데스크톱 화면에서는 최대 400px */
  height: auto;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 카드 */
.card {
  width: 100%;
  background: #e50914;
  color: white;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 1s ease-in-out, opacity 1s ease-in-out;
  padding: 20px;
}

/* 텍스트 스타일 */
h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}

label {
  font-size: 0.9rem;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #bf0812;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #a10610;
}

.switch {
  margin-top: 15px;
  text-align: center;
  font-size: 0.9rem;
  color: white;
  cursor: pointer;
}

.error {
  color: yellow;
  font-size: 0.8rem;
  margin-top: 5px;
  text-align: center;
}

/* 반응형 디자인 */
@media (max-width: 480px) {
  .wrapper {
    width: 95%; /* 모바일에서는 전체 화면 대비 95%로 설정 */
    padding: 10px;
  }

  .card {
    padding: 15px;
  }

  h2 {
    font-size: 1.2rem; /* 헤딩 크기 조정 */
  }

  label,
  input,
  button {
    font-size: 0.9rem; /* 입력 필드와 버튼 크기 축소 */
  }
}
</style>