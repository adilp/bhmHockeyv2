import {GET_EVENT_LIST, FETCH_BEGIN, FETCH_SUCCESS} from '../actions/types';

// const INITIAL_STATE = {
//     arr:[],
//     loading: true
// };

const INITIAL_STATE = {
  arr: {},
  isFetching: false,
};

const eventListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BEGIN:
      console.log('begining fetch');
      return {...state, isFetching: true};
    case FETCH_SUCCESS:
      //return { ...state, isFetching: false, arr: action.payload };
      console.log("Inside fetch", action.payload);
      return {
        arr: action.payload[0],
        isFetching: false,
      };
    default:
      return state;
  }
};

export default eventListReducer;
