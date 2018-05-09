import { LOCALE_SET, SET_SUBSCRIBE } from '../types';

export const locale = (state = { lang: 'tr' }, action = {}) => {
  switch (action.type) {
    case LOCALE_SET:
      return action;
    default:
      return state;
  }
};
export const subscribe = (state = { subscribed: false }, action = {}) => {
  switch (action.type) {
    case SET_SUBSCRIBE:
      return action;
    default:
      return state;
  }
};
