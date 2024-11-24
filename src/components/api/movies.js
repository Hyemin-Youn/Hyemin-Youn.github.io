import axios from 'axios';
import { API_KEY, BASE_URL } from '@/config.js';

export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: 'ko-KR',
        page,
      },
    });
    return response.data.results; // 영화 데이터 배열 반환
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};
