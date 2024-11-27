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
          <h2>로그인</h2>
          <form @submit.prevent="handleLogin">
            <label for="email">이메일</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              aria-label="이메일 주소를 입력하세요"
            />

            <label for="password">비밀번호</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              aria-label="비밀번호를 입력하세요"
            />

            <p v-if="loginError" class="error">{{ loginError }}</p>

            <div class="remember-me">
              <input
                id="rememberMe"
                v-model="rememberMe"
                type="checkbox"
              />
              <label for="rememberMe">로그인 상태 유지</label>
            </div>

            <button type="submit" :disabled="isLoading">
              {{ isLoading ? '처리 중...' : '로그인' }}
            </button>
          </form>
          <p class="switch" @click="switchToSignup">
            계정이 없으신가요? <b>회원가입</b>
          </p>
        </div>
      </div>

      <!-- 회원가입 카드 -->
      <div
        class="card"
        :class="{ active: activeCard === 'signup', backward: activeCard === 'login' }"
      >
        <div class="content">
          <h2>회원가입</h2>
          <form @submit.prevent="handleRegister">
            <label for="newEmail">이메일</label>
            <input
              id="newEmail"
              v-model="newEmail"
              type="email"
              required
              aria-label="이메일 주소를 입력하세요"
            />

            <label for="newPassword">비밀번호</label>
            <input
              id="newPassword"
              v-model="newPassword"
              type="password"
              required
              aria-label="비밀번호를 입력하세요"
            />

            <label for="confirmPassword">비밀번호 확인</label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
              aria-label="비밀번호를 다시 입력하세요"
            />

            <p v-if="signupError" class="error">{{ signupError }}</p>

            <div class="terms">
              <input
                id="terms"
                v-model="termsAccepted"
                type="checkbox"
              />
              <label for="terms">
                <b>이용 약관</b>을 읽고 동의합니다.
              </label>
            </div>

            <button type="submit" :disabled="!termsAccepted || isLoading">
              {{ isLoading ? '처리 중...' : '회원가입' }}
            </button>
          </form>
          <p class="switch" @click="switchToLogin">
            이미 계정이 있으신가요? <b>로그인</b>
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
      isLoading: false, // 로딩 상태
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
        this.loginError = "비밀번호는 최소 6자리 이상이어야 합니다.";
        return;
      }
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        alert("로그인에 성공했습니다!");
        this.$store.dispatch("login", { email: this.email });
        if (this.$route.path !== "/home") {
          this.$router.push("/home");
        }
      }, 2000); // 로딩 시뮬레이션
    },
    handleRegister() {
      if (this.newPassword.length < 6) {
        this.signupError = "비밀번호는 최소 6자리 이상이어야 합니다.";
        return;
      }
      if (this.newPassword !== this.confirmPassword) {
        this.signupError = "비밀번호가 일치하지 않습니다.";
        return;
      }
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        alert("회원가입에 성공했습니다!");
        this.switchToLogin();
      }, 2000); // 로딩 시뮬레이션
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
  width: 600px;
  height: 520px;
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
  width: 560px;
  height: 480px;
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 0.8s ease-in-out, opacity 0.8s ease-in-out;
  opacity: 0;
  z-index: 0;
}

.card.active {
  opacity: 1;
  z-index: 2;
  transform: rotateY(0deg) translateX(0);
}

.card.backward {
  z-index: 1;
  transform: rotateY(-90deg) translateX(-100%);
  opacity: 0;
}

.card.enter {
  opacity: 0;
  transform: rotateY(90deg) translateX(100%);
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
  backdrop-filter: blur(5px);
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
  color: #ffffff;
  font-weight: bold;
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
  transition: transform 0.2s ease-in-out;
}

button:hover {
  background-color: #a10610;
  transform: scale(1.05);
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

@media (max-width: 480px) {
  .wrapper {
    width: 90%;
    height: auto;
  }
  .content {
    padding: 20px;
    width: 70%;
  }
}
</style>
