import { action, computed, makeObservable, observable } from 'mobx';
import type { Movie } from '../types/movie';
import { FilterType, SortDirection, SortType } from './constants';
import { filteredMovies, sortMovies } from './helpers';
import type { Sort } from './types';
import type User from '../types/user';
import { Tag } from '../types/tag';

class GlobalModel {
  constructor() {
    makeObservable(this);
  }

  @observable currentUser: User | undefined = undefined;
  @observable id: number | undefined = undefined;
  @observable avatar: string | undefined = undefined;
  @observable firstName: string | undefined = undefined;
  @observable secondName: string | undefined = undefined;
  @observable authorized: boolean | undefined = undefined;
  @observable email: string | undefined = undefined;
  @observable ws: WebSocket = undefined;
  @observable _movies: Movie[] = [];
  @observable moviesFilter: FilterType = FilterType.All;
  @observable moviesSort: Sort = { type: SortType.CreatedAt, direction: SortDirection.Asc };
  @observable tags: Tag[] = [];

  @action
  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  @action
  setAuthorized(authorized) {
    this.authorized = authorized;
  }

  @action
  setId(id) {
    this.id = id;
  }

  @action
  setAvatar(avatar) {
    this.avatar = avatar;
  }

  @action
  setFirstName(firstName) {
    this.firstName = firstName;
  }

  @action
  setSecondName(secondName) {
    this.secondName = secondName;
  }

  @action
  setEmail(email) {
    this.email = email;
  }

  @action
  setWs(ws) {
    this.ws = ws;
  }

  @action
  setFilter(filter: FilterType) {
    this.moviesFilter = filter;
  }

  @action
  setSort(sort: Sort) {
    this.moviesSort = sort;
  }

  @computed
  get getFullName() {
    return this.secondName && this.firstName ? `${this.secondName} ${this.firstName}`.trim() : '';
  }

  @action
  setMovies(movies: Movie[]) {
    this._movies = movies;
  }

  @action
  addMovie(movie: Movie) {
    this._movies = [movie, ...this._movies];
  }

  @action
  deleteMovie(movie: Movie) {
    this._movies = this._movies.filter((m) => m.id !== movie.id);
  }

  @action
  updateMovie(movie: Movie) {
    this.deleteMovie(movie);
    this.addMovie(movie);
  }

  @computed
  get movies() {
    const movies = this._movies.slice();
    return sortMovies(this.moviesSort, filteredMovies(this.moviesFilter, movies));
  }

  @action
  setTags(tags: Tag[]) {
    this.tags = tags;
  }
}

const GlobalStore = new GlobalModel();
export default GlobalStore;
