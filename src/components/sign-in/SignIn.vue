<template>
  <div class="auth-container">
    <!-- 로그인 카드 -->
    <div v-if="activeCard === 'signin'" class="card">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Enter your password"
          required
        />

        <p v-if="loginError" class="error">{{ loginError }}</p>

        <button type="submit">Sign In</button>
        <p class="switch">
          Don't have an account? <a @click="switchToSignUp">Sign Up</a>
        </p>
      </form>
    </div>

    <!-- 회원가입 카드 -->
    <div v-else-if="activeCard === 'signup'" class="card">
      <h2>Sign Up</h2>
      <form @submit.prevent="handleRegister">
        <label for="newEmail">Email</label>
        <input
          id="newEmail"
          v-model="newEmail"
          type="email"
          placeholder="Enter your email"
          required
        />

        <label for="newPassword">Password</label>
        <input
          id="newPassword"
          v-model="newPassword"
          type="password"
          placeholder="Enter your password"
          required
        />

        <label for="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          required
        />

        <p v-if="signupError" class="error">{{ signupError }}</p>

        <button type="submit">Register</button>
        <p class="switch">
          Already have an account? <a @click="switchToSignIn">Sign In</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      activeCard: "signin", // 현재 활성 카드 ('signin' 또는 'signup')
      // 로그인 관련 상태
      email: "",
      password: "",
      loginError: "",
      // 회원가입 관련 상태
      newEmail: "",
      newPassword: "",
      confirmPassword: "",
      signupError: "",
    };
  },
  methods: {
    ...mapActions(["login", "register"]),
    switchToSignUp() {
      this.activeCard = "signup";
    },
    switchToSignIn() {
      this.activeCard = "signin";
    },
    async handleLogin() {
      const success = await this.login({
        email: this.email,
        password: this.password,
      });

      if (success) {
        alert("Login successful!");
        this.$router.push("/home"); // 로그인 성공 시 /home으로 이동
      } else {
        this.loginError = "Invalid email or password.";
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

      this.register({
        email: this.newEmail,
        password: this.newPassword,
      });

      alert("Registration successful! Please log in.");
      this.switchToSignIn();
    },
  },
};
</script>

<style scoped>
.auth-container {
  width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card {
  text-align: center;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #e50914;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #d40813;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.switch {
  margin-top: 15px;
  cursor: pointer;
  color: #007bff;
}

.switch a {
  text-decoration: underline;
}
</style>
