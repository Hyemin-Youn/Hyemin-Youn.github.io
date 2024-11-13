import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: null,
    isAuthenticated: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user; // user가 있으면 인증 상태 true
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      // 로그아웃 시 로컬 저장소의 사용자 정보도 제거
      localStorage.removeItem("registeredEmail");
      localStorage.removeItem("registeredPassword");
    },
  },
  actions: {
    login({ commit }, credentials) {
      // 로컬 저장소에 저장된 이메일과 비밀번호 가져오기
      const registeredEmail = localStorage.getItem("registeredEmail");
      const registeredPassword = localStorage.getItem("registeredPassword");

      // 이메일과 비밀번호가 일치하는지 확인
      if (
        credentials.email === registeredEmail &&
        credentials.password === registeredPassword
      ) {
        // 사용자 정보를 Vuex에 설정
        commit("setUser", { email: credentials.email });
        return true; // 로그인 성공
      } else {
        return false; // 로그인 실패
      }
    },
    register(_, newUser) {
      // 새로운 사용자의 이메일과 비밀번호를 로컬 저장소에 저장
      localStorage.setItem("registeredEmail", newUser.email);
      localStorage.setItem("registeredPassword", newUser.password);
    },
    logout({ commit }) {
      commit("logout");
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user,
  },
});

export default store;
