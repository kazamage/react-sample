import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from '@/reducers';

const configureStore = preloadedState => {
  const middlewares = [];
  if (process.env.NODE_ENV === 'development') {
    const { createLogger } = require('redux-logger');
    middlewares.push(createLogger({}));
  }
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(...middlewares)
    )
  );
  return store;
};

export default configureStore;
