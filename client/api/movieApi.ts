import axios, { AxiosPromise } from 'axios';
import Router from 'next/router';
import { Movie } from '../types/movie';
import { API_URL, unauthorizedPages } from './config';
import { Tag } from '../types/tag';

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      if (!unauthorizedPages.has(Router.pathname)) {
        Router.push('/');
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export const getMovies = (): AxiosPromise => axios.get(`${API_URL}/movies`);

export const getMovie = (movieId: string): AxiosPromise => axios.get(`${API_URL}/movies/${movieId}`);

export const toggleLike = (movieId: string): AxiosPromise<Movie> =>
  axios.post(`${API_URL}/movies/${movieId}/toggleLike`);

export const getFavouriteMovies = (): AxiosPromise => axios.get(`${API_URL}/movies/favourites`);

export const getMyVideos = (): AxiosPromise => axios.get(`${API_URL}/movies/my`);

export const addComment = (movieId: string, text: string): AxiosPromise =>
  axios.post(`${API_URL}/movies/${movieId}/comment`, { text });

export const updateMovie = (movieId: number | string, name: string, description: string, tags: Tag[]): AxiosPromise =>
  axios.patch(`${API_URL}/movies/${movieId}`, { name, description: description, tags: tags.map((t) => t.id) });

export const deleteMovie = (movieId: number | string): AxiosPromise => axios.delete(`${API_URL}/movies/${movieId}`);

export const createMovie = (name: string, description: string, tags: Tag[]): AxiosPromise<Movie> =>
  axios.post(`${API_URL}/movies`, { name, description: description, tags });

export const getTags = (): AxiosPromise<Tag[]> => axios.get(`${API_URL}/tags`);
