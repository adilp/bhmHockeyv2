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

const blackTeamReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BLACK_TEAM:
        console.log("Black team reducer action ", action.payload)
          return {...state, blackTeam: action.payload}
        case BLACK_TEAM_DNE:
        console.log("Black team reducer DNE action ", state)
          return INITIAL_STATE;
        default:
          return state;
      }
}

export default blackTeamReducer;