import { createStore } from 'vuex'; 
 
const store = createStore({ 
  state: { 
    movies: [], 
    user: null, 
  }, 
  mutations: { 
    setMovies(state, movies) { 
      state.movies = movies; 
    }, 
    setUser(state, user) { 
      state.user = user; 
    }, 
  }, 
  actions: { 
    fetchMovies({ commit }) { 
      // Fetch movies from an API 
      fetch('API_URL') 
        .then(response => response.json()) 
        .then(data => { 
          commit('setMovies', data); 
        }); 
    }, 
  }, 
}); 