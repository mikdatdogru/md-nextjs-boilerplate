const createReducer = ({ types, mapActionToKey }) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.');
  }
  const [requestType, successType, failureType] = types;

  const updateReducer = (state, action) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true,
          isFailure: false,
          isLoaded: false,
          payload: action.payload,
        };
      case successType:
        return {

          ...state,
          isFetching: false,
          isFailure: false,
          isLoaded: true,
          payload: action.payload,
        };
      case failureType:
        return {
          ...state,
          isFetching: false,
          isFailure: true,
          isLoaded: false,
          payload: action.payload,
        };
      default:
        return state;
    }
  };

  return (state = {}, action) => {
    // Update pagination by key
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const key = mapActionToKey(action);
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.');
        }
        return {
          ...state,
          ...updateReducer(state[key], action),
        };
      default:
        return state;
    }
  };
};
export default createReducer;
