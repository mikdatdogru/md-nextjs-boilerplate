import { GET_MOVIE_FAILURE, GET_MOVIE_FETCH, GET_MOVIE_RECEIVE, LOCALE_SET } from '../redux/types';
import { localStorageData } from '../utils/helper';

import { api } from '../utils';

export function localeSet(lang) {
  return {
    type: LOCALE_SET,
    lang,
  };
}

export const setLocale = lang => dispatch => {
  localStorageData.set(lang, 'language');
  dispatch(localeSet(lang));
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
