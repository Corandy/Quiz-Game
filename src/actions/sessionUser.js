import axios from 'axios';

//will send mail adress of user to the server to verify if its unique
//if succesfull it will fill in the user session data, with this the user is loggedin
export const loginByMailAddress = (email = false) => {  
  let root = document.location.hostname === 'localhost' ? 'http://' + document.location.hostname+':'+window.location.port : 'https://' + document.location.hostname;
  return function(dispatch) {
    console.log(root, root+'/api/verify');
    return axios.post(root+'/api/verify', {email: email})
    .then(res => {
      if(res.data === 'Already Used') {
        throw ('Already used');
      }
      dispatch({
        type: 'FILL_USER',
        userId: res.data,
        userMail: email
      });
      return true;     
    }).catch(err => {
      err = err == 'Already used' ? 'Already used, please try another emailaddress' : 'Something went wrong, please try again';
      throw (err);
    });
  }
};

//removes the user session, with this the user will be back to the login screen
export const removeUserId = () => ({
  type: 'REMOVE_USER'
});
