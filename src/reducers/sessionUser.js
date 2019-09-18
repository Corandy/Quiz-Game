const sessionUserReducerDefaultState = {
  userId: false,
  userMail: false
};

export default (state = sessionUserReducerDefaultState, action) => {
  switch (action.type) {
    case 'FILL_USER':
      return {userId: action.userId, userMail: action.userMail}
    case 'REMOVE_USER':
      return {userId: false, userMail:false}
    default:
      return state;
  }
};
