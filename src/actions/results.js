import axios from 'axios';

export const getAllResults = () => {  
  return function(dispatch) {
    return axios.post(`http://localhost:3000/api/results`)
    .then(res => {
      dispatch({
        type: 'SET_RESULTS',
        results: res.data
      });
      return true;     
    }).catch(err => {
      throw ('Something went wrong, please try again');
    });
  }
};

export const getUserSpecificResults = (userId) => {  
    return function(dispatch) {
      return axios.post(`http://localhost:3000/api/results/`+userId)
      .then(res => {
        dispatch({
          type: 'SET_SPECIFIC_RESULTS',
          results: res.data
        });
        return true;     
      }).catch(err => {
        throw ('Something went wrong, please try again');
      });
    }
  };