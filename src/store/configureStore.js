import {combineReducers} from 'redux-immutable'; //for immutable properties
import Immutable from 'immutable'; //for immutable properties
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; //for promises within store dispatches

import reducers from '../reducers';  //all sub stores located

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //for redux webview
export default () => {
  const store = createStore(
    combineReducers(reducers),
    Immutable.Map({}),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
