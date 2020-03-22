import {GET_USER_DETAILS, GET_USER_VENMO, GET_USER_EMAIL} from '../actions/types';
const INITIAL_STATE = {
  // userDetails: {},
  // venmo: '',
};

const userDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_DETAILS:
      console.log('actionDetails ', action.payload);
      return action.payload;
    default:
      console.log('default ');
      return state;
  }
};

export default userDetailsReducer;
