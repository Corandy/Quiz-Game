const questionsReducerDefaultState = {
  currentPage: 1,
  questions: []
};

export default (state = questionsReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_QUESTION':        
        let newQuestions = state.questions.slice();
        let indexAlreadyExists = newQuestions.length > action.page;
        if(!indexAlreadyExists) {
          newQuestions.push(action.question);            
        }      
        return {...state, questions: newQuestions};
    case 'SET_ANSWER':      
        let questionsWithNewAnswer = state.questions.slice();
        questionsWithNewAnswer = questionsWithNewAnswer.map((question, i) => {
          if((i+1) === action.page) {
            return {...question, user_answer: action.answer};
          } 
          return question;
        });          
        return {...state, questions: questionsWithNewAnswer};
    case 'NEXT_QUESTION':
        return {...state, currentPage: ++state.currentPage};
    case 'PREVIOUS_QUESTION':
        return {...state, currentPage: --state.currentPage};
    default:
      return state;
  }
};
