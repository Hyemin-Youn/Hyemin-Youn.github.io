<template>
  <div>
    <div class="bg-image"></div>
    <div class="container">
      <div id="phone">
        <div id="content-wrapper">
          <!-- 로그인 화면 -->
          <div :class="{'card': true, 'hidden': !isLoginVisible}" id="login">
            <form @submit.prevent="handleLogin">
              <h1>Sign in</h1>
              <div class="input" :class="{'active': isEmailFocused || email}">
                <input
                  id="email"
                  type="email"
                  v-model="email"
                  name="email"
                  @focus="focusInput('email')"
                  @blur="blurInput('email')"
                />
                <label for="email">Username or Email</label>
              </div>
              <div class="input" :class="{'active': isPasswordFocused || password}">
                <input
                  id="password"
                  type="password"
                  v-model="password"
                  name="password"
                  @focus="focusInput('password')"
                  @blur="blurInput('password')"
                />
                <label for="password">Password</label>
              </div>
              <span class="checkbox remember">
                <input type="checkbox" id="remember" v-model="rememberMe" name="rememberMe" />
                <label for="remember" class="read-text">Remember me</label>
              </span>
              <span class="checkbox forgot">
                <a href="#">Forgot Password?</a>
              </span>
              <button :disabled="!isLoginFormValid">Login</button>
            </form>
            <a
              href="javascript:void(0)"
              class="account-check"
              @click="toggleCard"
            >
              Don't have an account? <b>Sign up</b>
            </a>
          </div>

          <!-- 회원가입 화면 -->
          <div :class="{'card': true, 'hidden': isLoginVisible}" id="register">
            <form @submit.prevent="handleRegister">
              <h1>Sign up</h1>
              <div class="input" :class="{'active': isRegisterEmailFocused || registerEmail}">
                <input
                  id="register-email"
                  type="email"
                  v-model="registerEmail"
                  name="registerEmail"
                  @focus="focusInput('registerEmail')"
                  @blur="blurInput('registerEmail')"
                />
                <label for="register-email">Email</label>
              </div>
              <div class="input" :class="{'active': isRegisterPasswordFocused || registerPassword}">
                <input
                  id="register-password"
                  type="password"
                  v-model="registerPassword"
                  name="registerPassword"
                  @focus="focusInput('registerPassword')"
                  @blur="blurInput('registerPassword')"
                />
                <label for="register-password">Password</label>
              </div>
              <div class="input" :class="{'active': isConfirmPasswordFocused || confirmPassword}">
                <input
                  id="confirm-password"
                  type="password"
                  v-model="confirmPassword"
                  name="confirmPassword"
                  @focus="focusInput('confirmPassword')"
                  @blur="blurInput('confirmPassword')"
                />
                <label for="confirm-password">Confirm Password</label>
              </div>
              <span class="checkbox remember">
                <input
                  type="checkbox"
                  id="terms"
                  v-model="acceptTerms"
                  name="acceptTerms"
                />
                <label for="terms" class="read-text">I have read <b>Terms and Conditions</b></label>
              </span>
              <button :disabled="!isRegisterFormValid">Register</button>
            </form>
            <a
              href="javascript:void(0)"
              id="gotologin"
              class="account-check"
              @click="toggleCard"
            >
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
      email: '',
      password: '',
      rememberMe: false,
      registerEmail: '',
      registerPassword: '',
      confirmPassword: '',
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
      return this.email && this.password;
    },
    isRegisterFormValid() {
      return (
        this.registerEmail &&
        this.registerPassword &&
        this.confirmPassword &&
        this.acceptTerms &&
        this.registerPassword === this.confirmPassword
      );
    },
  },
  methods: {
    toggleCard() {
      this.isLoginVisible = !this.isLoginVisible;
    },
    handleLogin() {
      alert(`Logged in as: ${this.email}`);
    },
    handleRegister() {
      alert(`Registered with email: ${this.registerEmail}`);
    },
    focusInput(input) {
      this[`is${this.capitalize(input)}Focused`] = true;
    },
    blurInput(input) {
      this[`is${this.capitalize(input)}Focused`] = false;
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>

<style scoped>
/* CSS styles 그대로 복사 */
.bg-image {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
}
.bg-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(27, 27, 27, 0.9);
}
/* Add rest of the styles as provided */
</style>
