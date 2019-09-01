const sessionUserReducerDefaultState = {
  userId: false
};

export default (state = sessionUserReducerDefaultState, action) => {
  switch (action.type) {
    case 'FILL_USER_ID':
      return {userId: action.userId}
    case 'REMOVE_USER_ID':
      return {userId: false}
    default:
      return state;
  }
};
