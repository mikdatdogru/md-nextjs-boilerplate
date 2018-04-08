import { combineReducers } from 'redux';
import locale from './reducers/locale';
import { Movie } from './reducers/common';

export default combineReducers({
  locale,
  Movie,
});
