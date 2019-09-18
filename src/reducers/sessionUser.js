const sessionUserReducerDefaultState = {
  userId: '098ab82b-4881-3108-a67a-259cb3dc6009',
  userMail: 'tijntje_226_91@hotmail.com'
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
