import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionUserReducer from '../reducers/sessionUser';
import questionsReducer from '../reducers/questions';
import resultsReducer from '../reducers/results';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      sessionUser: sessionUserReducer,
      questions: questionsReducer,
      results: resultsReducer      
    }),   
    {},/* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
