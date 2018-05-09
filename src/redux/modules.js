import { combineReducers } from 'redux';
import { subscribe, locale } from './reducers/locale';
import { Movie, MovieList } from './reducers/common';

export default combineReducers({
  locale,
  subscribe,
  Movie,
  MovieList,
});
