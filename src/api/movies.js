import axios from "axios";
import { API_KEY, BASE_URL } from "@/config";

// 인기 영화 데이터를 가져오는 함수
export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: "ko-KR",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return { results: [] };
  }
};

// 검색 및 필터 옵션에 따라 영화를 가져오는 함수
export const fetchMovies = async (filters) => {
  const { genre, rating, language, page = 1 } = filters;

  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: "ko-KR",
        with_genres: genre !== "장르 (전체)" ? genre : null,
        "vote_average.gte": rating !== "평점 (전체)" ? parseFloat(rating.split("~")[0]) : null,
        "vote_average.lte": rating !== "평점 (전체)" ? parseFloat(rating.split("~")[1]) : null,
        with_original_language: language !== "언어 (전체)" ? language : null,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
