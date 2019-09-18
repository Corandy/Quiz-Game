const resultsReducerDefaultState = {
    userResults: [],
    results: []
};
  
  export default (state = resultsReducerDefaultState, action) => {
    switch (action.type) {
      case 'SET_USER_RESULTS':          
          return {...state, userResults: action.userResults};
      case 'SET_ALL_RESULTS':          
          return {...state, results: action.results};
      default:
        return state;
    }
  };
  