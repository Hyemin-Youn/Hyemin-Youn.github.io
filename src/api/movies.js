import axios from 'axios';
import { API_KEY, BASE_URL } from '@/config';

export const fetchMovies = async ({ genre = '', rating = '', language = '', page = 1 }) => {
  try {
    const params = {
      api_key: API_KEY,
      language: 'ko-KR',
      page,
    };

    if (genre && genre !== '장르 (전체)') {
      const genreMap = {
        Action: 28,
        Adventure: 12,
        Comedy: 35,
        Crime: 80,
        Family: 10751,
      };
      params.with_genres = genreMap[genre];
    }

    if (rating && rating !== '평점 (전체)') {
      const [minRating, maxRating] = rating.split('~').map(Number);
      params['vote_average.gte'] = minRating || 0;
      params['vote_average.lte'] = maxRating || 10;
    }

    if (language && language !== '언어 (전체)') {
      params.with_original_language = language;
    }

    const response = await axios.get(`${BASE_URL}/discover/movie`, { params });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};
