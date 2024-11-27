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
  background-image: url('https://images.unsplash.com/photo-1512070679279-8988d32161be?q=80&w=1938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  z-index: -1;
}

/* 컨테이너 */
.wrapper {
  width: 90%;
  max-width: 600px; /* 데스크톱에서는 최대 600px */
  height: auto; /* 높이를 콘텐츠에 따라 조정 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
}

/* 카드 */
.card {
  width: 100%; /* wrapper에 맞게 크기 조정 */
  max-width: 560px; /* 데스크톱에서 최대 너비 */
  height: auto; /* 높이를 콘텐츠에 따라 자동 조정 */
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 1.2s ease-in-out, opacity 1.2s ease-in-out;
  opacity: 0;
  z-index: 0;
  margin: 20px auto; /* 화면 중앙 정렬 */
}

/* 활성 카드 */
.card.active {
  opacity: 1;
  z-index: 2;
  transform: rotateY(0deg) translateX(0);
}

/* 뒤로 이동 */
.card.backward {
  z-index: 1;
  transform: rotateY(-90deg) translateX(-100%);
  opacity: 0;
}

/* 카드 애니메이션 진입 */
.card.enter {
  opacity: 0;
  transform: rotateY(90deg) translateX(100%);
}

/* 카드 콘텐츠 */
.content {
  width: 100%;
  height: 100%;
  padding: 20px;
  text-align: center;
  background: #e50914;
  color: #fff;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-sizing: border-box;
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
  margin: 20px auto;
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

/* 반응형 스타일 */
@media (max-width: 768px) {
  .wrapper {
    width: 95%; /* 작은 화면에서 wrapper 너비 확대 */
    padding: 10px; /* 여백 추가 */
  }

  .content {
    padding: 15px; /* 콘텐츠 여백 감소 */
  }

  h2 {
    font-size: 1.2rem; /* 제목 크기 축소 */
  }

  input {
    font-size: 0.8rem; /* 입력 필드 글자 크기 축소 */
    padding: 8px; /* 입력 필드 여백 축소 */
  }

  button {
    font-size: 0.8rem; /* 버튼 글자 크기 축소 */
    padding: 8px; /* 버튼 여백 축소 */
  }
}

@media (max-width: 480px) {
  .wrapper {
    width: 100%; /* 모바일 화면에서 전체 너비 사용 */
    padding: 10px;
  }

  .content {
    padding: 40px; /* 모바일 콘텐츠 여백 축소 */
  }

  h2 {
    font-size: 1rem; /* 제목 크기 더 축소 */
  }

  input {
    font-size: 0.8rem; /* 입력 필드 글자 크기 축소 */
    padding: 8px;
  }

  button {
    font-size: 0.8rem; /* 버튼 글자 크기 축소 */
    padding: 8px;
  }
}

  /* 컨테이너 가로 폭 */
  .card {
      width: 70%; /* 화면 너비의 70%로 설정 */
      max-width: 350px; /* 최대 350px로 제한 */
      margin: 0 auto; /* 중앙 정렬 */
      padding: 20px; /* 내부 여백 */
      background-color: red; /* 카드 배경색 */
      border-radius: 10px; /* 둥근 모서리 */
      height: auto;
  }

  /* 버튼과 "Remember Me" 간 간격 조정 */
  .remember-me {
      margin-bottom: 5px; /* Remember Me와 버튼 사이 간격 */
  }

  button {
      margin-top: 10px; /* 버튼 위쪽 간격 */
      padding: 10px 20px; /* 버튼 내부 여백 */
      width: 100%; /* 버튼을 컨테이너 너비에 맞춤 */
      background-color: darkred; /* 버튼 배경색 */
      color: white; /* 버튼 텍스트 색 */
      border: none; /* 버튼 테두리 제거 */
      border-radius: 5px; /* 버튼 모서리 둥글게 */
  }
  .container {
    width: 100%;
    max-width: 400px;
    padding: 20px; /* 기존 padding을 줄임 */
    margin: 0 auto;
    background-color: rgb(102, 4, 4);
}

/*prompt engineering 답변*/
input,
button {
    width: 100%;
    margin: 8px 0; /* 위아래 간격 최소화 */
    padding: 8px;   /* 내부 공간 줄임 */
    font-size: 14px; /* 글꼴 크기 줄임 */
}

.checkbox-label {
    margin-left: 5px;
}

.terms {
    font-size: 12px; /* 텍스트 크기 줄임 */
    line-height: 1.2; /* 줄 간격 축소 */
}

</style>
