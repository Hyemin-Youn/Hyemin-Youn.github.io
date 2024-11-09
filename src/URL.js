import axios from 'axios';

const apiKey = process.env.VUE_APP_API_KEY; // 환경 변수에서 API 키 가져오기
const language = 'ko-KR';

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
