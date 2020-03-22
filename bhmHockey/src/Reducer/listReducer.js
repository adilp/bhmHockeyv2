import {GET_LIST, LIST_FETCH_BEGIN} from '../actions/types';
const INITIAL_STATE = {
  team: [],
};

const listReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LIST:
      console.log('teams list ', action.payload);
      return action.payload;
    //return {...state, team: action.payload}
    case LIST_FETCH_BEGIN:
      console.log('start ', state);
      return state;
    default:
      console.log('default ');
      return state;
  }
};

export default listReducer;
