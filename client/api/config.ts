export const KINOPOISK_IPI_KEY = 'QWM7BQ4-JJH4D56-PX6RV2J-XNNZDPK';
export const HOST = 'localhost:8000'; // localhost:8000

export const API_URL = `/api`;
export const WS_URL = `ws://${HOST}`;
export const unauthorizedPages = new Set(['/', '/google-auth-failed']);
export const KINOPOISK_API_URL = 'https://api.kinopoisk.dev';
export const KINOPOISK_API_VERSION = 'v1.4';
export const KINOPOISK_AUTH_HEADERS = {
  'X-API-KEY': KINOPOISK_IPI_KEY,
};
