import { createStore } from "vuex";

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("user"),
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
    searchHistory: JSON.parse(localStorage.getItem("searchHistory")) || [],
    viewHistory: JSON.parse(localStorage.getItem("viewHistory")) || [],
    selectedOptions: {
      originalLanguage: "장르 (전체)",
      translationLanguage: "평점 (전체)",
      sorting: "언어 (전체)",
    },
    movies: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    searchQuery: "",
    errorMessage: "", // 에러 메시지 추가
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
        state.wishlist.push(movie);
      } else {
        state.wishlist.splice(existingMovieIndex, 1);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
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
    SET_SELECTED_OPTIONS(state, { key, value }) {
      state.selectedOptions[key] = value;
    },
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    APPEND_MOVIES(state, movies) {
      state.movies = [...state.movies, ...movies];
    },
    SET_PAGINATION(state, { currentPage, totalPages }) {
      state.currentPage = currentPage;
      state.totalPages = totalPages;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
    SET_ERROR(state, message) {
      state.errorMessage = message;
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
    setSelectedOptions({ commit }, { key, value }) {
      commit("SET_SELECTED_OPTIONS", { key, value });
    },
    async fetchMovies({ state, commit }, { page = 1, append = false }) {
      if (state.loading) return;
      commit("SET_LOADING", true);
      commit("SET_ERROR", ""); // 에러 메시지 초기화
      try {
        const encodedQuery = encodeURIComponent(state.searchQuery); // URL 인코딩
        const apiKey = "your_tmdb_api_key"; // 실제 TMDb API 키
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodedQuery}&page=${page}&api_key=${apiKey}`;
        console.log("API 요청 URL:", url); // 디버깅용 로그
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.status); // 상태 코드로 에러 확인
        const data = await response.json();
        if (append) {
          commit("APPEND_MOVIES", data.results);
        } else {
          commit("SET_MOVIES", data.results);
        }
        commit("SET_PAGINATION", {
          currentPage: page,
          totalPages: data.total_pages,
        });
      } catch (error) {
        console.error("API 호출 실패:", error);
        if (error.message === "401") {
          commit("SET_ERROR", "API 키가 유효하지 않습니다.");
        } else if (error.message === "404") {
          commit("SET_ERROR", "검색 결과가 없습니다.");
        } else {
          commit("SET_ERROR", "영화 데이터를 불러오는 중 오류가 발생했습니다.");
        }
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  getters: {
    wishlist: (state) => state.wishlist,
    isInWishlist: (state) => (id) => {
      return state.wishlist.some((movie) => movie.id === id);
    },
    searchHistory: (state) => state.searchHistory,
    viewHistory: (state) => state.viewHistory,
    selectedOptions: (state) => state.selectedOptions,
    movies: (state) => state.movies,
    currentPage: (state) => state.currentPage,
    totalPages: (state) => state.totalPages,
    loading: (state) => state.loading,
    searchQuery: (state) => state.searchQuery,
    errorMessage: (state) => state.errorMessage, // 에러 메시지 getter
  },
});

export default store;
