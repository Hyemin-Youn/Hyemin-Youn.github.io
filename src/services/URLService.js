import axios from "axios";

export default class URLService {
  /**
   * Fetches a featured movie using the TMDb API.
   * @param {string} apiKey - Your TMDb API key.
   * @returns {Promise<Object>} - The featured movie data.
   */
  static async fetchFeaturedMovie(apiKey) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR`
      );
      console.log(response.data.results[0]);
      return response.data.results[0];
    } catch (error) {
      console.error("Error fetching featured movie:", error);
    }
  }

  /**
   * Returns the URL for fetching popular movies.
   * @param {string} apiKey - Your TMDb API key.
   * @param {number} page - The page number to fetch.
   * @returns {string} - The URL for fetching popular movies.
   */
  static getURL4PopularMovies(apiKey, page = 1) {
    return `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=${page}`;
  }

  /**
   * Returns the URL for fetching movies currently playing in theaters.
   * @param {string} apiKey - Your TMDb API key.
   * @param {number} page - The page number to fetch.
   * @returns {string} - The URL for fetching now playing movies.
   */
  static getURL4ReleaseMovies(apiKey, page = 2) {
    return `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko-KR&page=${page}`;
  }

  /**
   * Returns the URL for fetching movies by genre.
   * @param {string} apiKey - Your TMDb API key.
   * @param {string} genre - The genre code.
   * @param {number} page - The page number to fetch.
   * @returns {string} - The URL for fetching movies by genre.
   */
  static getURL4GenreMovies(apiKey, genre, page = 1) {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&language=ko-KR&page=${page}`;
  }
}
