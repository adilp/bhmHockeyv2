import { combineReducers } from 'redux';
import listReducer from './listReducer';
import userReducer from './userReducer';
import userDetailsReducer from './userDetailsReducer';
import eventcountReducer from './eventcountReducer';
import eventListReducer from './eventListReducer';
import balanceTeamsReducer from './balanceTeamsReducer';
import whiteTeamReducer from './whiteTeamReducer';
import blackTeamReducer from './blackTeamReducer';
import teamListFetchReducer from './teamListFetchReducer';
import userVenmoReducer from './userVenmoReducer';
import userFormDetails from './userFormDetails';


export default combineReducers({
    listReducer: listReducer,
    userReducer: userReducer,
    userDetailsReducer: userDetailsReducer,
    eventcountReducer: eventcountReducer,
    eventListReducer: eventListReducer,
    balanceTeamsReducer: balanceTeamsReducer,
    whiteTeamReducer: whiteTeamReducer,
    blackTeamReducer: blackTeamReducer,
    teamListFetchReducer: teamListFetchReducer,
    userVenmoReducer: userVenmoReducer,
    userFormDetails: userFormDetails,
    
});
