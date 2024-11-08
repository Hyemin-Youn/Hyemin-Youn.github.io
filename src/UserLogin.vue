<!-- App.vue -->
<template>
  <div class="wrapper">
    <div class="bg-image"></div>
    <div class="container">
      <div id="phone">
        <div id="content-wrapper">
          <div :class="['card', { hidden: !isLoginVisible }]" id="login">
            <form @submit.prevent="handleLogin">
              <h1>Sign in</h1>
              <div class="input" :class="{ active: isEmailFocused || email }">
                <input
                  id="email"
                  type="email"
                  v-model="email"
                  @focus="focusInput('email')"
                  @blur="blurInput('email')"
                />
                <label for="email">Username or Email</label>
              </div>
              <div class="input" :class="{ active: isPasswordFocused || password }">
                <input
                  id="password"
                  type="password"
                  v-model="password"
                  @focus="focusInput('password')"
                  @blur="blurInput('password')"
                />
                <label for="password">Password</label>
              </div>
              <span class="checkbox remember">
                <input type="checkbox" id="remember" v-model="rememberMe" />
                <label for="remember" class="read-text">Remember me</label>
              </span>
              <span class="checkbox forgot">
                <a href="#">Forgot Password?</a>
              </span>
              <button :disabled="!isLoginFormValid">Login</button>
            </form>
            <a href="javascript:void(0)" class="account-check" @click="toggleCard">
              Don't have an account? <b>Sign up</b>
            </a>
          </div>

          <div :class="['card', { hidden: isLoginVisible }]" id="register">
            <form @submit.prevent="handleRegister">
              <h1>Sign up</h1>
              <div class="input" :class="{ active: isRegisterEmailFocused || registerEmail }">
                <input
                  id="register-email"
                  type="email"
                  v-model="registerEmail"
                  @focus="focusInput('registerEmail')"
                  @blur="blurInput('registerEmail')"
                />
                <label for="register-email">Email</label>
              </div>
              <div class="input" :class="{ active: isRegisterPasswordFocused || registerPassword }">
                <input
                  id="register-password"
                  type="password"
                  v-model="registerPassword"
                  @focus="focusInput('registerPassword')"
                  @blur="blurInput('registerPassword')"
                />
                <label for="register-password">Password</label>
              </div>
              <div class="input" :class="{ active: isConfirmPasswordFocused || confirmPassword }">
                <input
                  id="confirm-password"
                  type="password"
                  v-model="confirmPassword"
                  @focus="focusInput('confirmPassword')"
                  @blur="blurInput('confirmPassword')"
                />
                <label for="confirm-password">Confirm Password</label>
              </div>
              <span class="checkbox remember">
                <input type="checkbox" id="terms" v-model="acceptTerms" />
                <label for="terms" class="read-text">I have read <b>Terms and Conditions</b></label>
              </span>
              <button :disabled="!isRegisterFormValid">Register</button>
            </form>
            <a href="javascript:void(0)" class="account-check" @click="toggleCard">
              Already have an account? <b>Sign in</b>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoginVisible: true,
      email: "",
      password: "",
      registerEmail: "",
      registerPassword: "",
      confirmPassword: "",
      rememberMe: false,
      acceptTerms: false,
      isEmailFocused: false,
      isPasswordFocused: false,
      isRegisterEmailFocused: false,
      isRegisterPasswordFocused: false,
      isConfirmPasswordFocused: false,
    };
  },
  computed: {
    isLoginFormValid() {
      return !!this.email && !!this.password;
    },
    isRegisterFormValid() {
      return !!this.registerEmail &&
        !!this.registerPassword &&
        !!this.confirmPassword &&
        this.registerPassword === this.confirmPassword &&
        this.acceptTerms;
    },
  },
  methods: {
    toggleCard() {
      this.isLoginVisible = !this.isLoginVisible;
    },
    focusInput(inputName) {
      this[`is${inputName.charAt(0).toUpperCase() + inputName.slice(1)}Focused`] = true;
    },
    blurInput(inputName) {
      this[`is${inputName.charAt(0).toUpperCase() + inputName.slice(1)}Focused`] = false;
    },
    handleLogin() {
      if (this.isLoginFormValid) {
        alert("Login successful!");
      } else {
        alert("Login failed. Please try again.");
      }
    },
    handleRegister() {
      if (this.isRegisterFormValid) {
        alert("Registration successful!");
        this.toggleCard();
      } else {
        alert("Registration failed. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
/* 추가 CSS 스타일 - 이전 공유한 CSS 스타일 추가 */
</style>
