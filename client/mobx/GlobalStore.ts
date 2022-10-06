import { action, observable, makeObservable, computed } from 'mobx';
import type { Movie } from '../types/movie';

class GlobalModel {
  constructor() {
    makeObservable(this);
  }

  @observable id: string | undefined = undefined;
  @observable avatar: string | undefined = undefined;
  @observable firstName: string | undefined = undefined;
  @observable secondName: string | undefined = undefined;
  @observable authorized: boolean | undefined = undefined;
  @observable email: string | undefined = undefined;
  @observable ws: WebSocket = undefined;
  @observable movies: Movie[] = [];

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

  @computed
  get getFullName() {
    return this.secondName && this.firstName ? `${this.secondName} ${this.firstName}`.trim() : '';
  }

  @action
  setMovies(movies: Movie[]) {
    this.movies = movies;
  }

  @action
  addMovie(movie: Movie) {
    this.movies = [movie, ...this.movies];
  }

  @action
  deleteMovie(movie: Movie) {
    this.movies = this.movies.filter((m) => m.id !== movie.id);
  }

  @computed
  get moviesSortedByCreation() {
    return this.movies.slice().sort((m1, m2) => new Date(m2.createdAt).getTime() - new Date(m1.createdAt).getTime());
  }

  @computed
  get moviesSortedByLikes() {
    return this.movies.slice().sort((m1, m2) => m2.usersWhoLike.length - m1.usersWhoLike.length);
  }
}

const GlobalStore = new GlobalModel();
export default GlobalStore;
