import {
  GET_MOVIE_FAILURE,
  GET_MOVIE_FETCH,
  GET_MOVIE_RECEIVE,
  GET_MOVIE_LIST_FAILURE,
  GET_MOVIE_LIST_FETCH,
  GET_MOVIE_LIST_RECEIVE,
  LOCALE_SET,
  SET_SUBSCRIBE,
} from '../redux/types';
import { localStorageData } from '../utils/helper';

import { api } from '../utils/index';

export function localeSet(lang) {
  return {
    type: LOCALE_SET,
    lang,
  };
}

export const setLocale = lang => dispatch => {
  if (typeof window !== 'undefined') {
    localStorageData.set('language', lang);
  }
  dispatch(localeSet(lang));
};
export const setSubscribe = lang => dispatch => {
  dispatch({
    type: SET_SUBSCRIBE,
    subscribed: true,
  });
};

export const getMovieFetch = data => ({
  type: GET_MOVIE_FETCH,
  data,
});

export const getMovieReceive = data => ({
  type: GET_MOVIE_RECEIVE,
  data,
});
export const getMovieFailure = data => ({
  type: GET_MOVIE_FAILURE,
  data,
});

export function getMovie(data) {
  return dispatch => {
    dispatch(getMovieFetch(data));
    return api
      .getMovie(data)
      .then(res => {
        dispatch(getMovieReceive(res.data));

        return res;
      })
      .catch(err => {
        dispatch(getMovieFailure(err.response));

        return err;
      });
  };
}
export const getMovieListFetch = data => ({
  type: GET_MOVIE_LIST_FETCH,
  data,
});

export const getMovieListReceive = data => ({
  type: GET_MOVIE_LIST_RECEIVE,
  data,
});
export const getMovieListFailure = data => ({
  type: GET_MOVIE_LIST_FAILURE,
  data,
});

export function getMovieList(data) {
  return dispatch => {
    dispatch(getMovieListFetch(data));
    return api
      .getMovieList(data)
      .then(res => {
        dispatch(getMovieListReceive(res.data));

        return res;
      })
      .catch(err => {
        dispatch(getMovieListFailure(err.response));

        return err;
      });
  };
}
