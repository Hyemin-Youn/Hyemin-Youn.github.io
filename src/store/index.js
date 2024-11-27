import { createStore } from "vuex";

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null, // 유저 정보
    isAuthenticated: !!localStorage.getItem("user"), // 인증 여부
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [], // 찜한 리스트
    recentSearches: JSON.parse(localStorage.getItem("recentSearches")) || [], // 최근 검색어
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
      if (!state.recentSearches.includes(query)) {
        state.recentSearches.unshift(query); // 최신 검색어를 앞에 추가
        if (state.recentSearches.length > 10) {
          state.recentSearches.pop(); // 최대 10개의 검색어 저장
        }
        localStorage.setItem(
          "recentSearches",
          JSON.stringify(state.recentSearches)
        );
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
  },
  getters: {
    wishlist: (state) => state.wishlist,
    isInWishlist: (state) => (id) => {
      return state.wishlist.some((movie) => movie.id === id);
    },
    recentSearches: (state) => state.recentSearches,
  },
});

export default store;
