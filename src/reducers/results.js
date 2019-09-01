const resultsReducerDefaultState = {
    results: [],
    userSessionsResults: {}
};
  
  export default (state = resultsReducerDefaultState, action) => {
    switch (action.type) {
      case 'SET_RESULTS':          
          return {...state, results: action.results};
      case 'SET_SPECIFIC_RESULTS':
        return {...state, userSessionsResults: action.results};      
      default:
        return state;
    }
  };
  