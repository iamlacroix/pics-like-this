// @flow

import type { Store } from './types';

import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import createLogger from 'redux-logger';
import rootReducer from '../redux/reducers';
import rootEpic from '../redux/epics';

const isDev: boolean = process.env.NODE_ENV === 'development';

const logger = createLogger({
  predicate: (getState, action) => isDev,
  collapsed: true,
  duration: true,
});

const epicMiddleware = createEpicMiddleware(rootEpic);

export default (): Store => {
  const store = createStore(rootReducer,
    applyMiddleware(epicMiddleware, logger)
  );

  if (isDev) {
    window.store = store;
  }

  return store;
};
