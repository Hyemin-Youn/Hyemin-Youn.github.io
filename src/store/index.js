import { createStore } from "vuex";

const store = createStore({
  state: {
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [], // 찜한 리스트
  },
  mutations: {
    TOGGLE_WISHLIST(state, movie) {
      const existingIndex = state.wishlist.findIndex((item) => item.id === movie.id);
      if (existingIndex === -1) {
        // 영화가 리스트에 없다면 추가
        state.wishlist.push(movie);
      } else {
        // 영화가 리스트에 있으면 제거
        state.wishlist.splice(existingIndex, 1);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist)); // 로컬스토리지 업데이트
    },
  },
  actions: {
    toggleWishlist({ commit }, movie) {
      commit("TOGGLE_WISHLIST", movie);
    },
  },
  getters: {
    wishlist: (state) => state.wishlist,
    isInWishlist: (state) => (id) => state.wishlist.some((movie) => movie.id === id),
  },
});

export default store;
