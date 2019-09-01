const questionsReducerDefaultState = {
  currentPage: 1,
  questions: []
};

export default (state = questionsReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_QUESTION':        
        let questions = state.questions.slice();
        let indexAlreadyExists = questions.length > action.page;
        if(!indexAlreadyExists) {
            questions.push(action.question);            
        }      
        return {...state, questions};
    case 'SET_ANSWER':      
        let questions2 = state.questions.slice();
        questions2 = questions2.map((question, i) => {(i+1) === action.page ? {...question, answer: action.answer}: question});          
        return {...state, questions2};
    case 'NEXT_QUESTION':
        return {...state, currentPage: ++state.currentPage};
    case 'PREVIOUS_QUESTION':
        return {...state, currentPage: --state.currentPage};
    default:
      return state;
  }
};
