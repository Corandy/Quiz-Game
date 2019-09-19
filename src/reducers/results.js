import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    userResults: Immutable.List(),
    results: Immutable.List()
});
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_RESULTS':          
          return state.set('userResults', Immutable.fromJS(action.userResults));
      case 'SET_ALL_RESULTS':          
        return state.set('results', Immutable.fromJS(action.results));
      default:
        return state;
    }
  };
  