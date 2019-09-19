import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  userId: false,
  userMail: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FILL_USER':
      return state.merge({userId: action.userId, userMail: action.userMail});
    case 'REMOVE_USER':
      return state.merge({userId: false, userMail: false});
    default:
      return state;
  }
};
