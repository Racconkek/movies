import axios, { AxiosPromise } from 'axios';
import Router from 'next/router';
import { URL, unauthorizedPages } from './config';
import User from '../types/user';

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

export const getMyInfo = (): AxiosPromise<User> => axios.get(`${URL}/user/me`);
