import { Movie } from '../types/movie';
import { FilterType, OppositeDirection, SortDirection, SortType } from './constants';
import GlobalStore from './GlobalStore';
import { Sort } from './types';

const getDateNumber = (stringDate: string) => new Date(stringDate).getTime();

export const getMoviesSortedByCreation = (movies: Movie[], direction: SortDirection) => {
  return movies
    .slice()
    .sort((m1, m2) =>
      direction == SortDirection.Asc
        ? getDateNumber(m2.createdAt) - getDateNumber(m1.createdAt)
        : getDateNumber(m1.createdAt) - getDateNumber(m2.createdAt)
    );
};

export const getMoviesSortedByLikes = (movies: Movie[], direction: SortDirection) => {
  return movies.sort((m1, m2) =>
    direction === SortDirection.Asc
      ? m2.usersWhoLike.length - m1.usersWhoLike.length
      : m1.usersWhoLike.length - m2.usersWhoLike.length
  );
};

export const sortMovies = (moviesSort: Sort, movies: Movie[]) => {
  switch (moviesSort.type) {
    case SortType.CreatedAt:
      return getMoviesSortedByCreation(movies, moviesSort.direction);
    case SortType.Likes:
      return getMoviesSortedByLikes(movies, moviesSort.direction);
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

export const getDirection = (prevState: Sort, nextType: SortType) => {
  if (prevState.type === nextType) {
    return OppositeDirection[prevState.direction];
  }

  return SortDirection.Asc;
};
