import * as firebase from 'firebase';
import axios from 'axios';
import api from '../Api';
import {
  GET_LIST,
  GET_USER,
  GET_USER_DETAILS,
  GET_EVENT_COUNT,
  GET_EVENT_LIST,
  FETCH_BEGIN,
  FETCH_SUCCESS,
  BALANCE_TEAMS,
  WHITE_TEAM,
  BLACK_TEAM,
  WHITE_TEAM_DNE,
  BLACK_TEAM_DNE,
  LIST_FETCH_BEGIN,
  LIST_FETCH_SUCCESS,
  GET_USER_VENMO,
  GET_USER_PRICE,
  GET_USER_FIRSTNAME,
  GET_USER_LASTNAME,
  GET_USER_PLAYINGEXP,
  GET_USER_EMAIL,
  GET_FLAG,
  GET_GOLD,
  GET_SILVER,
  GET_BRONZE,
} from './types';

//export const getList = (teams) => ({type: GET_LIST, payload: teams})

// export const getGoldSched = () => {
//   return (dispatch) => {
//     var ref = firebase.database().ref('Events/');
//     const gsched = [];

//     ref.on('value', function (snapshot) {
//       console.log("Gold sched ", snapshot);
//       snapshot.forEach(function(child){
//         console.log("Gold sched ", child);
//       })
//       dispatch({ type: GET_GOLD, payload: gsched})
//     })
//   }
// }

export const getAllEventsUserIsRegisteredTo = uuid => {
  
}

export const getListThunk = uuid => {
  return dispatch => {
    dispatch(listFetchingStart());
    const teams = [];
    let eventListJsonResponse = {};
    var that = this;
    console.log('uuid thunk ', uuid);
    let url =
      api.backend + 'userEventDetails/getEventDetailsByEventUUID/' + uuid;
    axios.get(url).then(res => {
      eventListJsonResponse = res.data;
      //console.log('this is api call ', eventListJsonResponse);
      //console.log('Type of thunk ', typeof(eventListJsonResponse));
      teams.push(eventListJsonResponse);
      //console.log('teams ', teams[0]);
      //console.log('Team type of thunk ', typeof(teams));
      dispatch({type: GET_LIST, payload: eventListJsonResponse});
    });
  };
};

export const getUserThunk = () => {
  currentUser = firebase.auth().currentUser.uid;

  console.log('Dispatching get user');
  return {type: GET_USER, payload: currentUser};
};

export const getUserDetailsThunk = () => {
  const {currentUser} = firebase.auth();

  return dispatch => {
    let url = api.backend + 'users/' + currentUser.uid;

    axios.get(url).then(res => {
      const userJsonResponse = res.data;
      console.log(userJsonResponse.data);

      let userDetail = {
        firstName: userJsonResponse.data.firstName,
        email: userJsonResponse.data.email,
        uuid: userJsonResponse.data.uuid,
      };

      dispatch({
        type: GET_USER_DETAILS,
        //payload: userJsonResponse.data.firstName,
        payload: userDetail,
      });
      dispatch({type: GET_USER_VENMO, payload: userJsonResponse.data.venmo});
      dispatch({
        type: GET_USER_FIRSTNAME,
        payload: userJsonResponse.data.firstName,
      });
      dispatch({
        type: GET_USER_LASTNAME,
        payload: userJsonResponse.data.lastName,
      });
      dispatch({
        type: GET_USER_PLAYINGEXP,
        payload: userJsonResponse.data.level,
      });
      dispatch({type: GET_USER_EMAIL, payload: userJsonResponse.data.email});
      dispatch({type: GET_FLAG, payload: 1});
    });
  };
};

export const getEventCountThunk = uuid => {
  //console.log("Index UUUID " , uuid);
  //foundKey = '';
  return dispatch => {
    let url = api.backend + 'events/' + uuid;
    axios.get(url).then(res => {
      eventCountJsonResponse = res.data;
      console.log(
        'this is api call ',
        eventCountJsonResponse.data.availableSpots,
      );
      dispatch({
        type: GET_EVENT_COUNT,
        payload: eventCountJsonResponse.data.availableSpots,
      });
      //console.log('Type of thunk ', typeof(eventListJsonResponse));
      // teams.push(eventListJsonResponse);
      //console.log('teams ', teams[0]);
      //console.log('Team type of thunk ', typeof(teams));
      // dispatch({type: GET_LIST, payload: eventListJsonResponse});
    });

    // var ref = firebase.database().ref('Events/');
    // ref
    //   .orderByChild('uuid')
    //   .equalTo(uuid)
    //   .on('value', function(snapshot) {
    //     //console.log("Snapshot from action " , snapshot.val())
    //     snapshot.forEach(child => {
    //       //console.log("child ", child.val().availableSpots)
    //       dispatch({
    //         type: GET_EVENT_COUNT,
    //         payload: child.val().availableSpots,
    //       });
    //     });
    //   });
  };
};

export const updateCount = (uuid, flag) => {
  console.log('Index UUUID ', uuid);
  // = '';
  var decrement = '';
  return dispatch => {
    var ref = firebase.database().ref('Events/');
    ref
      .orderByChild('uuid')
      .equalTo(uuid)
      .once('value', function(snapshot) {
        //console.log("Snapshot from action " , snapshot.val())
        snapshot.forEach(child => {
          console.log('Current Spots ', child.val().availableSpots);
          if (flag === 0) {
            console.log('decremtnt');
            decrement = child.val().availableSpots - 1;
          } else if (flag === 1) {
            console.log('increment');
            decrement = child.val().availableSpots + 1;
          }

          console.log('Remove Spots ', decrement);
          child.ref.update({availableSpots: decrement});

          //dispatch({ type: GET_EVENT_COUNT, payload: decrement });
        });
      });
  };
};

export const fetchingStart = () => ({type: FETCH_BEGIN});

export const fetchingSuccess = ar => ({
  type: FETCH_SUCCESS,
  payload: ar,
});

export const listFetchingStart = () => ({type: LIST_FETCH_BEGIN});

export const listFetchingSuccess = () => ({type: LIST_FETCH_SUCCESS});

export const getAllEvents = () => {
  var a = [];
  return dispatch => {
    dispatch(fetchingStart());
    let url = api.backend + 'events/getUpcomingEvents/1';
    axios.get(url).then(res => {
      const eventJsonResponse = res.data;
      console.log(eventJsonResponse);

      eventJsonResponse.forEach(child => {
        console.log(child);
        a.push(child);
      });
      console.log('Array dispatch ', a);
      dispatch(fetchingSuccess(a));
    });

    // var ref = firebase.database().ref('Events/');
    // ref.orderByChild('epochTime').on('value', function(snapshot) {
    //   //console.log("Snapshot from action " , snapshot.val())
    //   snapshot.forEach(child => {
    //     console.log("old api ", child.val());
    //     a.push(child.val());
    //   });
    //   console.log('Array dispatch ', a);
    //   dispatch(fetchingSuccess(a));
    //   //dispatch({ type: GET_EVENT_LIST, payload: a });
    // });
  };
};

export const getListBalanced = uuid => {
  return dispatch => {
    dispatch(listFetchingStart());
    var ref = firebase.database().ref('TeamsList/' + uuid);
    ref.on('value', function(snapshot) {
      if (snapshot.hasChild('whiteTeam')) {
        console.log('White team exists');
        dispatch({type: WHITE_TEAM, payload: snapshot.val().whiteTeam});
      } else {
        console.log('White team does not exist');
        dispatch({type: WHITE_TEAM_DNE});
      }

      if (snapshot.hasChild('blackTeam')) {
        console.log('Black team exists');
        dispatch({type: BLACK_TEAM, payload: snapshot.val().blackTeam});
      } else {
        console.log('BLack team does not exist');
        dispatch({type: BLACK_TEAM_DNE});
      }

      dispatch({type: BALANCE_TEAMS, payload: snapshot.val()});

      // var whiteTeam = snapshot.val().whiteTeam
      // var blackTeam = snapshot.val().blackTeam

      // dispatch({type: WHITE_TEAM, payload: whiteTeam})
      // //dispatch({})
      // dispatch({type: BALANCE_TEAMS, payload: snapshot.val()})
    });
  };
};
