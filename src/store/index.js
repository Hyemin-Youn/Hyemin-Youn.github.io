import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),
    wishlist: JSON.parse(localStorage.getItem('wishlist')) || [], // wishlist 동기화
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
    ADD_TO_WISHLIST(state, movie) {
      const exists = state.wishlist.find((item) => item.id === movie.id);
      if (!exists) {
        state.wishlist.push(movie);
        localStorage.setItem('wishlist', JSON.stringify(state.wishlist)); // 동기화
      }
    },
    REMOVE_FROM_WISHLIST(state, movieId) {
      state.wishlist = state.wishlist.filter((item) => item.id !== movieId);
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist)); // 동기화
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
        return true; // 로그인 성공
      } else {
        return false; // 로그인 실패
      }
    },
    register(_, newUser) {
      localStorage.setItem('registeredEmail', newUser.email);
      localStorage.setItem('registeredPassword', newUser.password);
    },
    logout({ commit }) {
      commit('logout');
    },
    addToWishList({ commit }, movie) {
      commit('ADD_TO_WISHLIST', movie);
    },
    removeFromWishList({ commit }, movieId) {
      commit('REMOVE_FROM_WISHLIST', movieId);
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user,
    wishlist: (state) => state.wishlist,
  },
});

export default store;
