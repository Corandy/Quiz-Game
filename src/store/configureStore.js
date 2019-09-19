import {combineReducers} from 'redux-immutable';
import Immutable from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers(reducers),
    Immutable.Map({}),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
