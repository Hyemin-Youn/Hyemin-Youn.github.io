import { createStore } from "vuex";

const store = createStore({
  state: {
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [], // 찜한 리스트 (로컬스토리지 연동)
  },
  getters: {
    // 특정 영화가 위시리스트에 있는지 확인
    isInWishlist: (state) => (id) => {
      return state.wishlist.some((movie) => movie.id === id);
    },
    // 전체 위시리스트 반환
    wishlistMovies: (state) => {
      return state.wishlist;
    },
  },
  mutations: {
    // 영화 추가/삭제 토글
    TOGGLE_WISHLIST(state, movie) {
      const existingIndex = state.wishlist.findIndex((item) => item.id === movie.id);
      if (existingIndex === -1) {
        // 영화가 위시리스트에 없다면 추가
        state.wishlist.push(movie);
      } else {
        // 영화가 위시리스트에 있으면 제거
        state.wishlist.splice(existingIndex, 1);
      }
      // 로컬스토리지 업데이트
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    // 위시리스트 초기화
    RESET_WISHLIST(state) {
      state.wishlist = [];
      localStorage.removeItem("wishlist");
    },
  },
  actions: {
    // 위시리스트 토글 액션
    toggleWishlist({ commit }, movie) {
      commit("TOGGLE_WISHLIST", movie);
    },
    // 위시리스트 초기화 액션
    resetWishlist({ commit }) {
      commit("RESET_WISHLIST");
    },
  },
});

export default store;
