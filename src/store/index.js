import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null, // 사용자 정보
    isAuthenticated: !!localStorage.getItem('user'), // 인증 여부
  },
  mutations: {
    setUser(state, user) {
      // 사용자 정보를 Vuex 상태 및 localStorage에 저장
      state.user = user;
      state.isAuthenticated = !!user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user)); // 사용자 정보 저장
      } else {
        localStorage.removeItem('user'); // 사용자 정보 제거
      }
    },
    logout(state) {
      // 로그아웃 처리
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user'); // 사용자 정보 제거
    },
  },
  actions: {
    login({ commit }, credentials) {
      // 등록된 사용자 정보를 가져옴
      const registeredEmail = localStorage.getItem('registeredEmail');
      const registeredPassword = localStorage.getItem('registeredPassword');

      // 이메일과 비밀번호를 비교
      if (
        credentials.email === registeredEmail &&
        credentials.password === registeredPassword
      ) {
        // 로그인 성공 시 사용자 정보 저장
        commit('setUser', { email: credentials.email });
        return true;
      } else {
        // 로그인 실패 시 false 반환
        return false;
      }
    },
    register(_, newUser) {
      // 새 사용자 등록 (localStorage에 저장)
      localStorage.setItem('registeredEmail', newUser.email);
      localStorage.setItem('registeredPassword', newUser.password);
    },
    logout({ commit }) {
      // 로그아웃 처리
      commit('logout');
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated, // 인증 여부 반환
    user: (state) => state.user, // 사용자 정보 반환
  },
});

export default store;
