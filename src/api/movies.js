import axios from "axios";

const API_KEY = "your_tmdb_api_key"; // 여기에 TMDb API 키를 입력하세요
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (filters) => {
  const { genre, rating, language } = filters;

  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: "ko-KR",
        with_genres: genre !== "장르 (전체)" ? genre : null,
        "vote_average.gte": rating !== "평점 (전체)" ? parseFloat(rating.split("~")[0]) : null,
        "vote_average.lte": rating !== "평점 (전체)" ? parseFloat(rating.split("~")[1]) : null,
        with_original_language: language !== "언어 (전체)" ? language : null,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
