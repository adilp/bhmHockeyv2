import { BALANCE_TEAMS, BLACK_TEAM, WHITE_TEAM, BLACK_TEAM_DNE, WHITE_TEAM_DNE, FETCH_SUCCESS } from '../actions/types';



// const INITIAL_STATE = {
//     arr:[],
//     loading: true
// };

const INITIAL_STATE = {
    whiteTeam: [{
      Name: "Empty",
      Paid: "Empty"
    }]
  }

const whiteTeamReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WHITE_TEAM:
        console.log("White team reducer action ", action.payload)
          return {...state, whiteTeam: action.payload}
        case WHITE_TEAM_DNE:
        console.log("White team reducer DNE action ", state)
          return INITIAL_STATE;
        default:
          return state;
      }
}

export default whiteTeamReducer;