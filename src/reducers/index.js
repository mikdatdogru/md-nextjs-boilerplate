import { combineReducers } from 'redux';

import todos from './todos';
import locale from './locale';

export default combineReducers({ todos, locale });
