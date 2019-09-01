import axios from 'axios';

export const getQuestion = (alreadyQuestioned = []) => {  
  alreadyQuestioned = alreadyQuestioned.length > 0 ? alreadyQuestioned.map((question) => question.id) : alreadyQuestioned;
  return function(dispatch) {
    return axios.post(`http://localhost:3000/api/question`, {alreadyQuestioned: JSON.stringify(alreadyQuestioned)})
    .then(res => {
      if(res.data == 'no questions left') {
        throw ('no questions left');
      }  
      dispatch({
        type: 'SET_QUESTION',
        question: res.data
      });
      return true;     
    }).catch(err => {
      err = err == 'no questions left' ? 'No questions left' : 'Something went wrong, please try again';
      throw (err);
    });
  }
};

export const nextQuestion = () => {  
    return function(dispatch) {
        dispatch({
          type: 'NEXT_QUESTION'
        });
    }
};

export const previousQuestion = () => {  
    return function(dispatch) {
        dispatch({
          type: 'PREVIOUS_QUESTION'
        });
    }
};