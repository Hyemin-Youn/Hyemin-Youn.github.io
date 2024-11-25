const axios = require("axios");

class URLService {
  // 인기 영화 데이터 가져오기
  async fetchFeaturedMovie(apiKey) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR`
      );
      console.log("Featured Movie:", response.data.results[0]);
      return response.data.results[0];
    } catch (error) {
      console.error("Error fetching featured movie:", error.message);
      return null; // 에러 발생 시 null 반환
    }
  }

  // 인기 영화 URL 생성
  getURL4PopularMovies(apiKey, page = 1) {
    return `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=${page}`;
  }

  // 개봉 예정 영화 URL 생성
  getURL4ReleaseMovies(apiKey, page = 2) {
    return `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko-KR&page=${page}`;
  }

  // 특정 장르 영화 URL 생성
  getURL4GenreMovies(apiKey, genre, page = 1) {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&language=ko-KR&page=${page}`;
  }
}

module.exports = URLService;
