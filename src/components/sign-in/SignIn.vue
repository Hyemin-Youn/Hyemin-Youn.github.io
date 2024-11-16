<template>
  <div>
    <div class="bg-image"></div> <!-- 배경 이미지 -->
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
            Don't have an account? <b>Sign up</b>
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
              <label for="terms">I have read the <b>Terms and Conditions</b></label>
            </div>

            <button type="submit" :disabled="!termsAccepted">Register</button>
          </form>
          <p class="switch" @click="flipCard">
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
  methods: {
  flipCard() {
    this.isFlipped = !this.isFlipped;
  },
  handleLogin() {
  if (this.password.length !== 32) {
    this.loginError = "Password must be exactly 32 characters long.";
    return;
  }

  alert("Login successful!");

  // Vuex에 로그인 상태 저장
  this.$store.dispatch('login', { email: this.email });

  // 중복된 URL 방지
  if (this.$route.path !== '/home') {
    this.$router.push('/home');
  }
}
,
  handleRegister() {
    if (this.newPassword.length !== 32) {
      this.signupError = "Password must be exactly 32 characters long.";
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.signupError = "Passwords do not match.";
      return;
    }
    alert("Registration successful!");
    this.flipCard(); // 회원가입 후 로그인 화면으로 전환
  },
},

};
</script>

<style scoped>
/* 배경 이미지 스타일 */
.bg-image {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  z-index: -1; /* 배경이 뒤에 위치하도록 설정 */
}

/* 로그인/회원가입 창 스타일 */
.wrapper {
  width: 400px;
  height: 520px;
  margin: 0 auto;
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
  padding: 30px 20px;
  text-align: center;
  background: rgba(212, 0, 255, 0.26);
  color: #fff;
  border-radius: 15px;
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

.remember-me,
.terms {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin: 10px 0;
  text-align: center;
}

.remember-me input[type="checkbox"],
.terms input[type="checkbox"] {
  margin-right: 6px;
  cursor: pointer;
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
@media screen and (max-width: 768px) {
  .wrapper {
    width: 320px;
    height: 500px;
  }

  h2 {
    font-size: 1.4rem;
  }

  input {
    padding: 8px;
    font-size: 0.8rem;
  }

  button {
    padding: 8px;
    font-size: 0.8rem;
  }

  .switch {
    font-size: 0.7rem;
  }
}

@media screen and (max-width: 480px) {
  .wrapper {
    width: 280px;
    height: 450px;
  }

  h2 {
    font-size: 1.2rem;
  }

  input {
    padding: 6px;
    font-size: 0.7rem;
  }

  button {
    padding: 6px;
    font-size: 0.7rem;
  }

  .switch {
    font-size: 0.6rem;
  }
}
</style>
