// src/utils/api.js
import axios from 'axios';

export const fetchMovies = async () => {
  try {
    const response = await axios.get('API_URL');
    return response.data;
  } catch (error) {
    console.error('API 호출 오류:', error);
  }
};
