import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  currentPage: 1,
  questions: Immutable.List()
});

//keeps track of the given questions, if these are answered and on which page the user is
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUESTION':          
        let indexAlreadyExists = state.size > action.page;
        if(!indexAlreadyExists) {
          return state.update('questions', arr => arr.push(Immutable.fromJS(action.question)));         
        }  
        return state.merge(...state);
    case 'SET_ANSWER': //fills answer at the specific question     
      const index = state.get('questions').findIndex((item, index) => {
        return (index+1) === action.page;
      });  
      return state.updateIn(['questions', index], (question) => {
        return question.set('user_answer', action.answer);
      });
    case 'NEXT_QUESTION':
        return state.set('currentPage', state.get('currentPage')+1);
    case 'PREVIOUS_QUESTION':
        return state.set('currentPage', state.get('currentPage')-1);
    default:
      return state;
  }
};
