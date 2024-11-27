import { createStore } from "vuex";

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("user"),
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [], // 찜한 리스트
    searchHistory: JSON.parse(localStorage.getItem("searchHistory")) || [], // 검색 기록
    viewHistory: JSON.parse(localStorage.getItem("viewHistory")) || [], // 시청 기록
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
    TOGGLE_WISHLIST(state, movie) {
      const existingMovieIndex = state.wishlist.findIndex(
        (item) => item.id === movie.id
      );

      if (existingMovieIndex === -1) {
        // 영화가 리스트에 없다면 추가
        state.wishlist.push(movie);
      } else {
        // 영화가 리스트에 있으면 제거
        state.wishlist.splice(existingMovieIndex, 1);
      }

      localStorage.setItem("wishlist", JSON.stringify(state.wishlist)); // 로컬스토리지 동기화
    },
    ADD_SEARCH_HISTORY(state, query) {
      if (!state.searchHistory.includes(query)) {
        state.searchHistory.push(query);
        localStorage.setItem("searchHistory", JSON.stringify(state.searchHistory));
      }
    },
    ADD_VIEW_HISTORY(state, movie) {
      if (!state.viewHistory.some((item) => item.id === movie.id)) {
        state.viewHistory.push(movie);
        localStorage.setItem("viewHistory", JSON.stringify(state.viewHistory));
      }
    },
  },
  actions: {
    toggleWishlist({ commit }, movie) {
      commit("TOGGLE_WISHLIST", movie);
    },
    addSearchHistory({ commit }, query) {
      commit("ADD_SEARCH_HISTORY", query);
    },
    addViewHistory({ commit }, movie) {
      commit("ADD_VIEW_HISTORY", movie);
    },
  },
  getters: {
    wishlist: (state) => state.wishlist,
    isInWishlist: (state) => (id) => {
      return state.wishlist.some((movie) => movie.id === id);
    },
    searchHistory: (state) => state.searchHistory,
    viewHistory: (state) => state.viewHistory,
  },
});

export default store;
