import { createStore } from "vuex";
import { fetchMovies, searchMovies } from "@/api/movies";

const store = createStore({
  state: {
    searchQuery: "",
    movies: [],
    filters: {
      genre: "장르 (전체)",
      rating: "평점 (전체)",
      language: "언어 (전체)",
    },
    currentPage: 1,
    totalPages: 1,
    loading: false,
  },
  mutations: {
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
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
    async fetchMovies({ state, commit }, { append = false } = {}) {
      if (state.loading) return;

      commit("SET_LOADING", true);
      try {
        const filters = { ...state.filters, page: append ? state.currentPage + 1 : 1 };
        const data = await fetchMovies(filters);
        if (append) {
          commit("APPEND_MOVIES", data.results);
        } else {
          commit("SET_MOVIES", data.results);
        }
        commit("SET_PAGINATION", { currentPage: data.page, totalPages: data.total_pages });
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async searchMovies({ state, commit }, { query, append = false }) {
      if (state.loading) return;

      commit("SET_LOADING", true);
      try {
        const page = append ? state.currentPage + 1 : 1;
        const data = await searchMovies(query, page);
        if (append) {
          commit("APPEND_MOVIES", data);
        } else {
          commit("SET_MOVIES", data);
        }
        commit("SET_PAGINATION", { currentPage: page, totalPages: state.totalPages });
      } catch (error) {
        console.error("Error searching movies:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    setFilter({ commit }, { key, value }) {
      commit("SET_FILTER", { key, value });
    },
  },
  getters: {
    movies: (state) => state.movies,
    filters: (state) => state.filters,
    searchQuery: (state) => state.searchQuery,
    loading: (state) => state.loading,
  },
});

export default store;
