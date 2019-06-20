import createDispatcher from './createDispatcher';

const unitFunction = x => x;

const createAction = ({ api, data, types, scb, ecb }) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements!');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings!');
  }

  const [requestType, successType, failureType] = types;

  if (typeof api !== 'function') {
    throw new Error('Expected actionType to be function!');
  }

  return (dispatch, getState) => {
    dispatch(createDispatcher(requestType, data));

    return api(data)
      .then(res => {
        const mySuccessFunction = scb || unitFunction;
        dispatch(createDispatcher(successType, mySuccessFunction(res.data, dispatch, getState)));

        return res;
      })
      .catch(err => {
        const myErrorFunction = ecb || unitFunction;
        dispatch(createDispatcher(failureType, myErrorFunction(err.response, dispatch, getState)));

        return err;
      });
  };
};
export default createAction;
