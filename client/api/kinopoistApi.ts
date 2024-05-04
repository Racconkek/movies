import axios, { AxiosPromise } from 'axios';
import { KINOPOISK_API_URL, KINOPOISK_API_VERSION, KINOPOISK_AUTH_HEADERS } from './config';
import { KinopoiskSearchMovieResponse } from '../types/kinopoisk';

export const searchKinopoiskMoviesByName = (params: {
  query: string;
  page?: number;
  limit?: number;
}): AxiosPromise<KinopoiskSearchMovieResponse> =>
  axios.get(`${KINOPOISK_API_URL}/${KINOPOISK_API_VERSION}/movie/search`, {
    params: params,
    headers: KINOPOISK_AUTH_HEADERS,
  });
