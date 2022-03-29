export const API = process.env.REACT_APP_API_KEY;

export const API_URL = 'https://api.themoviedb.org/3';

export const SEARCH_URL = `${API_URL}/search/multi?api_key=${API}&query=`;

export const POPULAR_ON_TV = `${API_URL}/tv/popular?api_key=${API}`;
export const POPULAR_IN_THEATERS = `${API_URL}/movie/now_playing?api_key=${API}`;

export const TRENDING_TODAY = `${API_URL}/trending/all/day?api_key=${API}`;
export const TRENDING_THIS_WEEK = `${API_URL}/trending/all/week?api_key=${API}`;

// Categories

export const NOW_PLAYING = `${API_URL}/movie/now_playing?api_key=${API}`;
export const UPCOMING = `${API_URL}/movie/upcoming?api_key=${API}`;
export const TOP_RATED = `${API_URL}/movie/top_rated?api_key=${API}`;
export const POPULAR = `${API_URL}/movie/popular?api_key=${API}`;

const BASE_URL = 'https://www.themoviedb.org/t/p';
export const LOGO_URL =
  'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg';
export const IMAGE_URL = `${BASE_URL}/w220_and_h330_face`;
export const POSTER_URL = `${BASE_URL}/w300_and_h450_bestv2`;
export const BACKDROP_URL = `${BASE_URL}/w1920_and_h800_multi_faces`;
export const STREAMING_URL = `${BASE_URL}/original`;
export const CAST_URL = `${BASE_URL}/w138_and_h175_face`;
export const NETWORK_URL = `${BASE_URL}/h30`;
