// Expenses Reducer

const userReducerDefaultState = {
  userId: false
};

export default (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case 'FILL_USER_ID':
      return {userId: action.userId}
    case 'REMOVE_USER_ID':
      return {userId: false}
    default:
      return state;
  }
};
