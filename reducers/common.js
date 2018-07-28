import {
  SAMPLE_REQUEST,
  SAMPLE_SUCCESS,
  SAMPLE_FAILURE,
  TICK,
  INCREMENT,
  DECREMENT,
  RESET,
} from '../utils/types';
import createReducer from '../utils/createReducer';

// Without using createReducer example:
/*

export const sampleData = (
  state = {
    isFetching: false,
    isLoaded: false,
    isFailure: false,
  },
  action = {},
) => {
  switch (action.type) {
    case SAMPLE_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFailure: false,
        isLoaded: false,
        data: action.data,
      };

    case SAMPLE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFailure: false,
        isLoaded: true,
        data: action.data,
      };

    case SAMPLE_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFailure: true,
        isLoaded: false,
        data: action.data,
      };

    default:
      return state;
  }
};
*/

export const sampleData = createReducer({
  mapActionToKey: action => action.type,
  types: [SAMPLE_REQUEST, SAMPLE_SUCCESS, SAMPLE_FAILURE],
});

export const reduce = (
  state = {
    lastUpdate: 0,
    light: false,
    count: 0,
  },
  action,
) => {
  switch (action.type) {
    case TICK:
      return Object.assign({}, state, {
        lastUpdate: action.ts,
        light: !!action.light,
      });
    case INCREMENT:
      return Object.assign({}, state, {
        count: state.count + 1,
      });
    case DECREMENT:
      return Object.assign({}, state, {
        count: state.count - 1,
      });
    case RESET:
      return Object.assign({}, state, {
        count: 0,
      });
    default:
      return state;
  }
};
