import axios from 'axios';

export const getUserResults = (userId) => {  
    return function(dispatch) {
      return axios.get(`http://localhost:3000/api/results/`+userId)
      .then(res => {
        dispatch({
          type: 'SET_USER_RESULTS',
          userResults: res.data
        });
        return true;     
      }).catch(err => {
        throw ('Something went wrong, please try again');
      });
    }
  };

  export const getAllResults = () => {  
    return function(dispatch) {
      return axios.get(`http://localhost:3000/api/results`)
      .then(res => {
        dispatch({
          type: 'SET_ALL_RESULTS',
          results: res.data
        });
        return true;     
      }).catch(err => {
        throw ('Something went wrong, please try again');
      });
    }
  };

  export const sendResults = (userId = false, results = []) => {
    let answers = [];
    for(var i=0; i < results.length; i++) {
      let answer = {};
      answer.id = results[i].id;
      answer.answer = results[i].user_answer;
      answers.push(answer);
    }
    return function(dispatch) {
      return axios.post(`http://localhost:3000/api/results`, {userId: userId, answers:answers})
      .then(res => {
        return true;     
      }).catch(err => {
        throw ('Something went wrong, please try again');
      });
    }
  }