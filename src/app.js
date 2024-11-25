const URLService = require("./URLService"); // 모듈 가져오기
const API_KEY = "VUE_APP_API_KEY"; // TMDB API 키

(async () => {
  const urlService = new URLService();

  // 인기 영화 가져오기
  const featuredMovie = await urlService.fetchFeaturedMovie(API_KEY);
  console.log("Featured Movie:", featuredMovie);

  // 인기 영화 URL 생성
  const popularMoviesURL = urlService.getURL4PopularMovies(API_KEY, 1);
  console.log("Popular Movies URL:", popularMoviesURL);

  // 개봉 예정 영화 URL 생성
  const releaseMoviesURL = urlService.getURL4ReleaseMovies(API_KEY, 1);
  console.log("Release Movies URL:", releaseMoviesURL);

  // 특정 장르 영화 URL 생성
  const genreMoviesURL = urlService.getURL4GenreMovies(API_KEY, "28", 1); // 액션 장르 (28)
  console.log("Genre Movies URL:", genreMoviesURL);
})();
