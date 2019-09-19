import Immutable from 'immutable';

//state management of the results (both used in the result and leaderboard)
const initialState = Immutable.fromJS({
    userResults: Immutable.List(), //results only from the user
    results: Immutable.List() //results of all players
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
  