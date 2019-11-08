import axios from 'axios';

//get result from node server based on userId. userId is an encrypted mail string
//when succesful it will update the redux results state
export const getUserResults = (userId) => {  
    let root = document.location.hostname === 'localhost' ? 'http://' + document.location.hostname+':'+window.location.port : 'https://' + document.location.hostname;
    return function(dispatch) {
      return axios.get(root+'/api/results/'+userId)
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

  //get results from all players from  node server
  //when succesful it will update the redux results state
  export const getAllResults = () => {  
    let root = document.location.hostname === 'localhost' ? 'http://' + document.location.hostname+':'+window.location.port : 'https://' + document.location.hostname;
    return function(dispatch) {
      return axios.get(root+'/api/results')
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

  //send anwsers to the node server
  //node server will validate the answers and add a score to it and saves it on the server
  export const sendResults = (userId = false, results = []) => {
    let root = document.location.hostname === 'localhost' ? 'http://' + document.location.hostname+':'+window.location.port : 'https://' + document.location.hostname;
    let answers = [];
    for(var i=0; i < results.length; i++) {
      let answer = {};
      answer.id = results[i].id;
      answer.answer = results[i].user_answer;
      answers.push(answer);
    }
    return function(dispatch) {
      return axios.post(root+'api/results', {userId: userId, answers:answers})
      .then(res => {
        return true;     
      }).catch(err => {
        throw ('Something went wrong, please try again');
      });
    }
  }
