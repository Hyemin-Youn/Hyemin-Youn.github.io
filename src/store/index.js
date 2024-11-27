const store = createStore({
  state: {
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [], // 찜한 리스트
    searchHistory: JSON.parse(localStorage.getItem("searchHistory")) || [], // 검색 기록
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false, // 로그인 여부
    userPreferences: JSON.parse(localStorage.getItem("userPreferences")) || {}, // 사용자 설정
    viewHistory: JSON.parse(localStorage.getItem("viewHistory")) || [], // 시청 기록
  },
  mutations: {
    TOGGLE_WISHLIST(state, movie) {
      const existingIndex = state.wishlist.findIndex((item) => item.id === movie.id);
      if (existingIndex === -1) {
        state.wishlist.push(movie);
      } else {
        state.wishlist.splice(existingIndex, 1);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    ADD_SEARCH_HISTORY(state, query) {
      if (!state.searchHistory.includes(query)) {
        state.searchHistory.push(query);
        if (state.searchHistory.length > 10) state.searchHistory.shift(); // 최대 10개 저장
        localStorage.setItem("searchHistory", JSON.stringify(state.searchHistory));
      }
    },
    SET_LOGGED_IN(state, status) {
      state.isLoggedIn = status;
      localStorage.setItem("isLoggedIn", JSON.stringify(status));
    },
    ADD_VIEW_HISTORY(state, movie) {
      state.viewHistory.push({
        ...movie,
        viewedAt: new Date().toISOString(),
      });
      localStorage.setItem("viewHistory", JSON.stringify(state.viewHistory));
    },
  },
  actions: {
    toggleWishlist({ commit }, movie) {
      commit("TOGGLE_WISHLIST", movie);
    },
    addSearchHistory({ commit }, query) {
      commit("ADD_SEARCH_HISTORY", query);
    },
    setLoggedIn({ commit }, status) {
      commit("SET_LOGGED_IN", status);
    },
    addViewHistory({ commit }, movie) {
      commit("ADD_VIEW_HISTORY", movie);
    },
  },
  getters: {
    wishlist: (state) => state.wishlist,
    searchHistory: (state) => state.searchHistory,
    isLoggedIn: (state) => state.isLoggedIn,
    viewHistory: (state) => state.viewHistory,
  },
});

export default store;
