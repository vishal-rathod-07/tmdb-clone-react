export const API = '15d2ea6d0dc1d476efbca3eba2b9bbfb';

export const API_URL = 'https://api.themoviedb.org/3';

export const LOGO_URL =
  'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg';

export const POPULAR_ON_TV = `${API_URL}/tv/popular?api_key=${API}`;
export const POPULAR_IN_THEATERS = `${API_URL}/movie/now_playing?api_key=${API}`;
export const TRENDING_TODAY = `${API_URL}/trending/all/day?api_key=${API}`;
export const TRENDING_THIS_WEEK = `${API_URL}/trending/all/week?api_key=${API}`;
