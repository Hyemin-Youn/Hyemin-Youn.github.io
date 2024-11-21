import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),
    wishlist: JSON.parse(localStorage.getItem('wishlist')) || [], // 찜한 리스트
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
      if (!state.wishlist.find((item) => item.id === movie.id)) {
        state.wishlist.push(movie);
        localStorage.setItem('wishlist', JSON.stringify(state.wishlist)); // 로컬스토리지 동기화
      }
    },
    REMOVE_FROM_WISHLIST(state, movieId) {
      state.wishlist = state.wishlist.filter((item) => item.id !== movieId);
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist)); // 로컬스토리지 동기화
    },
  },
  actions: {
    addToWishList({ commit }, movie) {
      commit('ADD_TO_WISHLIST', movie);
    },
    removeFromWishList({ commit }, movieId) {
      commit('REMOVE_FROM_WISHLIST', movieId);
    },
  },
  getters: {
    wishlist: (state) => state.wishlist,
  },
});

export default store;
