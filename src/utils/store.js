import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// eslint-disable-next-line import/no-extraneous-dependencies
import { devToolsEnhancer } from 'redux-devtools-extension';

import rootReducer from '../reducers';
/* eslint-disable no-underscore-dangle */


const middlewares = [thunk];
const composed = [applyMiddleware(...middlewares)];

/* let enhancers;
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
	enhancers = compose(
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__({ serialize: true, trace: true }),
	);
} else {
	enhancers = compose(f => f);
} */

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
	if (window.__REDUX_DEVTOOLS_EXTENSION__) {
		composed.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
	} else {
		composed.push(devToolsEnhancer({ realtime: true, serialize: true, trace: true }));
		console.log(
			'%c Go to url for see redux actions: http://remotedev.io/local/ ',
			'background: #222; color: #bada55;  padding:3px 1px',
		);
	}
} else {
	composed.push(f => f);
}
/* eslint-enable */
export default initialState => createStore(rootReducer, initialState, compose(...composed));
