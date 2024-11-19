import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),
    wishList: JSON.parse(localStorage.getItem('wishList')) || [], // 찜한 영화 리스트
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
      if (!state.wishList.find((item) => item.id === movie.id)) {
        state.wishList.push(movie); // 중복 방지
        localStorage.setItem('wishList', JSON.stringify(state.wishList)); // 로컬스토리지에 저장
      }
    },
    REMOVE_FROM_WISHLIST(state, movieId) {
      state.wishList = state.wishList.filter((movie) => movie.id !== movieId);
      localStorage.setItem('wishList', JSON.stringify(state.wishList)); // 로컬스토리지 업데이트
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
    getWishList: (state) => state.wishList, // 찜한 리스트 가져오기
  },
});

export default store;
