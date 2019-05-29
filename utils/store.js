import { createStore, compose, applyMiddleware } from 'redux';

import rootReducer from '../reducers';
/* eslint-disable no-underscore-dangle */
const enhancers = compose(
	typeof window !== 'undefined' && process.env.NODE_ENV !== 'production'
		? window.__REDUX_DEVTOOLS_EXTENSION__ &&
				window.__REDUX_DEVTOOLS_EXTENSION__({ serialize: true, trace: true })
		: f => f
);
/* eslint-enable */
const createStoreWithMiddleware = applyMiddleware()(createStore);

export default initialState =>
	createStoreWithMiddleware(rootReducer, initialState, enhancers);


