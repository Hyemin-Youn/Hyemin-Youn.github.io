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
    const params = {
      api_key: API_KEY,
      language: "ko-KR",
      page,
    };

    // 장르 필터 추가
    if (genre && genre !== "장르 (전체)") {
      const genreMap = {
        Action: 28,
        Adventure: 12,
        Comedy: 35,
        Crime: 80,
        Family: 10751,
      };
      params.with_genres = genreMap[genre] || null; // 장르 매핑
    }

    // 평점 필터 추가
    if (rating && rating !== "평점 (전체)") {
      const [minRating, maxRating] = rating.split("~").map(Number);
      params["vote_average.gte"] = minRating || 0;
      params["vote_average.lte"] = maxRating || 10;
    }

    // 언어 필터 추가
    if (language && language !== "언어 (전체)") {
      params.with_original_language = language;
    }

    const response = await axios.get(`${BASE_URL}/discover/movie`, { params });
    return response.data; // 전체 데이터를 반환
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { results: [] }; // 빈 데이터 반환
  }
};

// 카테고리별 영화 데이터를 가져오는 함수
export const fetchMoviesByCategory = async (category, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${category}`, {
      params: {
        api_key: API_KEY,
        language: "ko-KR",
        page,
      },
    });
    return response.data.results; // 영화 목록만 반환
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
    return [];
  }
};

// 키워드로 영화를 검색하는 함수
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        language: "ko-KR",
        query,
        page,
      },
    });
    return response.data.results; // 영화 목록만 반환
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};
