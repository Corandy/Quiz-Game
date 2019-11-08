import axios from 'axios';

export const getQuestion = (alreadyQuestioned = []) => { 
  let root = document.location.hostname === 'localhost' ? 'http://' + document.location.hostname+':'+window.location.port : 'https://' + document.location.hostname;
  alreadyQuestioned = alreadyQuestioned.length > 0 ? alreadyQuestioned.map((question) => question.id) : alreadyQuestioned;
  return function(dispatch) {
    return axios.post(root+'/api/question', {alreadyQuestioned: JSON.stringify(alreadyQuestioned)})
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

export const setAnswer = (page, answer) => {  
    return function(dispatch) {
        dispatch({
          type: 'SET_ANSWER',
          page,
          answer
        });
    }
};
