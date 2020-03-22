
import { BALANCE_TEAMS, BLACK_TEAM, WHITE_TEAM, BLACK_TEAM_DNE, WHITE_TEAM_DNE, FETCH_SUCCESS } from '../actions/types';


// const INITIAL_STATE = {
//     arr:[],
//     loading: true
// };

const INITIAL_STATE = {
    blackTeam: [{
      Name: "Empty",
      Paid: "Empty"
    }]
  }

const balanceTeamsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BALANCE_TEAMS:
            console.log("balance teams reducer ", action.payload)
          return action.payload;
          //return [...state, state.blackTeam: action.payload]
        default:
          return state;
      }
}

export default balanceTeamsReducer;