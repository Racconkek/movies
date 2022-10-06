import { Movie } from '../types/movie';
import { FilterType, SortType } from './constants';
import GlobalStore from './GlobalStore';

export const getMoviesSortedByCreation = (movies: Movie[]) => {
  return movies.slice().sort((m1, m2) => new Date(m2.createdAt).getTime() - new Date(m1.createdAt).getTime());
};

export const getMoviesSortedByLikes = (movies: Movie[]) => {
  return movies.sort((m1, m2) => m2.usersWhoLike.length - m1.usersWhoLike.length);
};

export const sortMovies = (moviesSort: SortType, movies: Movie[]) => {
  switch (moviesSort) {
    case SortType.CreatedAt:
      return getMoviesSortedByCreation(movies);
    case SortType.Likes:
      return getMoviesSortedByLikes(movies);
  }
};

export const getMoviesFilteredByMe = (movies: Movie[]) => {
  return movies.filter((m) => m.authorId === GlobalStore.id);
};

export const getMoviesFilteredByFav = (movies: Movie[]) => {
  return movies.filter((m) => !!m.usersWhoLike.find((user) => user.id === GlobalStore.id));
};

export const filteredMovies = (moviesFilter: FilterType, movies: Movie[]) => {
  switch (moviesFilter) {
    case FilterType.All:
      return movies;
    case FilterType.My:
      return getMoviesFilteredByMe(movies);
    case FilterType.Favourites:
      return getMoviesFilteredByFav(movies);
  }
};
