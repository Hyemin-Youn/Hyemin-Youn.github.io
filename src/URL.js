import axios from 'axios';

const apiKey = '75b7c972001662bd9d37622e0e222947'; // 실제 API 키로 변경하세요
const language = 'ko-KR';

// API 엔드포인트 구성
const endpoints = {
  popularMovies: (page = 1) => `/movie/popular?api_key=${apiKey}&language=${language}&page=${page}`,
  nowPlayingMovies: (page = 1) => `/movie/now_playing?api_key=${apiKey}&language=${language}&page=${page}`,
  discoverMovies: (page = 1) => `/discover/movie?api_key=${apiKey}&language=${language}&page=${page}`,
};

// 데이터 요청 처리 함수
export const fetchMovies = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// 예시: 인기 영화 데이터 요청
export const fetchPopularMovies = async (page = 1) => {
  const url = endpoints.popularMovies(page);
  return await fetchMovies(url);
};

// 예시: 현재 상영작 데이터 요청
export const fetchNowPlayingMovies = async (page = 1) => {
  const url = endpoints.nowPlayingMovies(page);
  return await fetchMovies(url);
};

// 예시: 장르별 영화 데이터 요청
export const fetchDiscoverMovies = async (page = 1) => {
  const url = endpoints.discoverMovies(page);
  return await fetchMovies(url);
};
