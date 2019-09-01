import axios from 'axios';

export const loginByMailAddress = (email = false) => {  
  return function(dispatch) {
    return axios.post(`http://localhost:3000/api/verify`, {email: email})
    .then(res => {
      if(res.data === 'Already Used') {
        throw ('Already used');
      }
      dispatch({
        type: 'FILL_USER_ID',
        userId: res.data
      });
      return true;     
    }).catch(err => {
      err = err == 'Already used' ? 'Already used, please try another emailaddress' : 'Something went wrong, please try again';
      throw (err);
    });
  }
};

export const removeUserId = () => ({
  type: 'REMOVE_USER_ID'
});