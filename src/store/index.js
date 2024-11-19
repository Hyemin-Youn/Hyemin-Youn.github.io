import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  },
  actions: {
    login({ commit }, credentials) {
      const registeredEmail = localStorage.getItem('registeredEmail');
      const registeredPassword = localStorage.getItem('registeredPassword');

      if (
        credentials.email === registeredEmail &&
        credentials.password === registeredPassword
      ) {
        commit('setUser', { email: credentials.email });
        return true;
      } else {
        return false;
      }
    },
    register(_, newUser) {
      localStorage.setItem('registeredEmail', newUser.email);
      localStorage.setItem('registeredPassword', newUser.password);
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user,
  },
});

export default store;
