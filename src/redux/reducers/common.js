import {
  GET_MOVIE_FAILURE,
  GET_MOVIE_FETCH,
  GET_MOVIE_RECEIVE,
  GET_MOVIE_LIST_FAILURE,
  GET_MOVIE_LIST_FETCH,
  GET_MOVIE_LIST_RECEIVE,
} from '../types';

const initialState = {
  isFetching: false,
  isLoaded: false,
  isFailure: false,
};

export const Movie = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_MOVIE_FETCH:
      return {
        ...state,
        isFetching: true,
        isFailure: false,
        isLoaded: false,
        data: action.data,
      };

    case GET_MOVIE_RECEIVE:
      return {
        ...state,
        isFetching: false,
        isFailure: false,
        isLoaded: true,
        data: action.data,
      };

    case GET_MOVIE_FAILURE:
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

export const MovieList = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_MOVIE_LIST_FETCH:
      return {
        ...state,
        isFetching: true,
        isFailure: false,
        isLoaded: false,
        data: action.data,
      };

    case GET_MOVIE_LIST_RECEIVE:
      return {
        ...state,
        isFetching: false,
        isFailure: false,
        isLoaded: true,
        data: action.data,
      };

    case GET_MOVIE_LIST_FAILURE:
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
