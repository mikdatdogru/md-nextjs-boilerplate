import { createStore, applyMiddleware, compose } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import thunk from 'redux-thunk';

import rootReducer from './redux/modules';

const middlewares = [thunk];

const composed = [applyMiddleware(...middlewares)];

// composed.push(devToolsEnhancer({ realtime: true }));

if (process.env.NODE_ENV === 'development') {
  if (typeof window !== 'undefined') {
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      composed.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    } else {
      composed.push(devToolsEnhancer({ realtime: true }));
      console.log(
        '%c Go to url for see redux actions: http://remotedev.io/local/ ',
        'background: #222; color: #bada55;  padding:3px 1px',
      );
    }
  }
}
const store = createStore(rootReducer, {}, compose(...composed));

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./redux/modules', () => {
    // eslint-disable-next-line
    const nextRootReducer = require('./redux/modules').default;
    store.replaceReducer(nextRootReducer);
  });
}


export const initStore = () => store;
