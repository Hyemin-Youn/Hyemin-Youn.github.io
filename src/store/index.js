import { createStore } from "vuex";

const store = createStore({
  state: {
    searchHistory: JSON.parse(localStorage.getItem("searchHistory")) || [],
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
    movies: [],
    filters: {
      genre: "all",
      rating: "all",
      language: "all",
    },
    currentPage: 1,
    totalPages: 1,
    loading: false,
  },
  mutations: {
    ADD_SEARCH_HISTORY(state, query) {
      if (!state.searchHistory.includes(query)) {
        state.searchHistory.push(query);
        localStorage.setItem("searchHistory", JSON.stringify(state.searchHistory));
      }
    },
    TOGGLE_WISHLIST(state, movie) {
      const existingIndex = state.wishlist.findIndex((item) => item.id === movie.id);
      if (existingIndex === -1) {
        state.wishlist.push(movie); // 추가
      } else {
        state.wishlist.splice(existingIndex, 1); // 제거
      }
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    APPEND_MOVIES(state, movies) {
      state.movies = [...state.movies, ...movies];
    },
    SET_FILTER(state, { key, value }) {
      state.filters[key] = value;
    },
    SET_PAGINATION(state, { currentPage, totalPages }) {
      state.currentPage = currentPage;
      state.totalPages = totalPages;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    addSearchHistory({ commit }, query) {
      commit("ADD_SEARCH_HISTORY", query);
    },
    toggleWishlist({ commit }, movie) {
      commit("TOGGLE_WISHLIST", movie);
    },
    async fetchMovies({ state, commit }, { query = "", append = false } = {}) {
      if (state.loading) return;

      commit("SET_LOADING", true);

      const apiKey = "your_tmdb_api_key"; // TMDb API 키
      const filters = state.filters;
      const page = append ? state.currentPage + 1 : 1;

      const url = new URL(query ? "https://api.themoviedb.org/3/search/movie" : "https://api.themoviedb.org/3/discover/movie");
      url.searchParams.append("api_key", apiKey);
      url.searchParams.append("page", page);
      if (query) url.searchParams.append("query", query);
      if (filters.genre !== "all") url.searchParams.append("with_genres", filters.genre);
      if (filters.rating !== "all") url.searchParams.append("vote_average.gte", filters.rating);
      if (filters.language !== "all") url.searchParams.append("language", filters.language);

      try {
        const response = await fetch(url.toString());
        const data = await response.json();
        if (append) {
          commit("APPEND_MOVIES", data.results);
        } else {
          commit("SET_MOVIES", data.results);
        }
        commit("SET_PAGINATION", { currentPage: page, totalPages: data.total_pages });
      } catch (error) {
        console.error("영화 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  getters: {
    searchHistory: (state) => state.searchHistory,
    wishlist: (state) => state.wishlist,
    movies: (state) => state.movies,
    loading: (state) => state.loading,
    currentPage: (state) => state.currentPage,
    totalPages: (state) => state.totalPages,
  },
});

export default store;
