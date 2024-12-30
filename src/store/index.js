import { createStore } from "vuex";

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null, // 사용자 정보
    isAuthenticated: !!localStorage.getItem("user"), // 인증 상태
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [], // 찜 목록
    recentSearches: JSON.parse(localStorage.getItem("recentSearches")) || [], // 최근 검색어 목록
    searchResults: JSON.parse(localStorage.getItem("searchResults")) || [], // 검색 결과 저장
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
        // 영화가 찜 목록에 없으면 추가
        state.wishlist.push(movie);
      } else {
        // 영화가 찜 목록에 있으면 제거
        state.wishlist.splice(existingMovieIndex, 1);
      }

      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    ADD_SEARCH_HISTORY(state, query) {
      if (!state.recentSearches.includes(query)) {
        state.recentSearches.unshift(query); // 최신 검색어를 목록 맨 앞에 추가
        if (state.recentSearches.length > 10) {
          state.recentSearches.pop(); // 최근 검색어는 최대 10개까지만 유지
        }
        localStorage.setItem(
          "recentSearches",
          JSON.stringify(state.recentSearches)
        );
      }
    },
    DELETE_SEARCH_HISTORY(state, index) {
      state.recentSearches.splice(index, 1); // 해당 인덱스의 검색어 삭제
      localStorage.setItem(
        "recentSearches",
        JSON.stringify(state.recentSearches)
      );
    },
    SET_SEARCH_RESULTS(state, results) {
      state.searchResults = results; // 검색 결과 저장
      localStorage.setItem("searchResults", JSON.stringify(results));
    },
  },
  actions: {
    toggleWishlist({ commit }, movie) {
      commit("TOGGLE_WISHLIST", movie);
    },
    addSearchHistory({ commit }, query) {
      commit("ADD_SEARCH_HISTORY", query);
    },
    deleteSearchHistory({ commit }, index) {
      commit("DELETE_SEARCH_HISTORY", index);
    },
    setSearchResults({ commit }, results) {
      console.log("검색 결과 저장 중:", results);
      commit("SET_SEARCH_RESULTS", results);
    },
  },
  getters: {
    wishlist: (state) => state.wishlist, // 찜 목록 가져오기
    isInWishlist: (state) => (id) => {
      return state.wishlist.some((movie) => movie.id === id); // 특정 영화가 찜 목록에 있는지 확인
    },
    recentSearches: (state) => state.recentSearches, // 최근 검색어 가져오기
    searchResults: (state) => state.searchResults, // 저장된 검색 결과 가져오기
  },
});

export default store;
