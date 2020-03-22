import * as firebase from "firebase";
import { GET_LIST, GET_USER, GET_USER_DETAILS, 
  GET_EVENT_COUNT, GET_EVENT_LIST, FETCH_BEGIN, 
  FETCH_SUCCESS, BALANCE_TEAMS, WHITE_TEAM, BLACK_TEAM, WHITE_TEAM_DNE, BLACK_TEAM_DNE, LIST_FETCH_BEGIN, LIST_FETCH_SUCCESS } from './types';

//export const getList = (teams) => ({type: GET_LIST, payload: teams})


export const getListThunk = (uuid) => {
    return (dispatch) => {
        const teams = [];
        const teamsObj = {};
        var that = this;
        console.log("uuid thunk ", uuid);
        var ref = firebase.database().ref('SignUp/' + uuid);
        

        ref.on('value', function (snapshot) {
            console.log("snap ", snapshot.val())
            snapshot.forEach(function (child) {
            
                let currentlike = child.val()
                    console.log("schedas ", currentlike)
                    teams.push(currentlike);
                    console.log("teams ",teams);
            });
            dispatch({ type: GET_LIST, payload: teams})
        })
    }
    
}

export const getUserThunk = () => {
    currentUser = firebase.auth().currentUser.uid;

        
            console.log("Dispatching get user")
           return { type: GET_USER, payload: currentUser};
       
    
}

export const getUserDetailsThunk = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
      firebase.database().ref(`/UsersList/${currentUser.uid}`)
        .on('value', snapshot => {
            let firstName = (snapshot.val() && snapshot.val().firstname)
            let lastName = (snapshot.val() && snapshot.val().lastname)
            //console.log("FirstName ",  firstName)
            fullname = firstName + " " + lastName
            //console.log("Full name thunk ", fullname)
          dispatch({ type: GET_USER_DETAILS, payload: fullname });
        });
    };
  };

  export const getEventCountThunk = (uuid) => {
    //console.log("Index UUUID " , uuid);
    foundKey = '';
    return (dispatch) => {
        var ref = firebase.database().ref('Events/');
        ref.orderByChild("uuid").equalTo(uuid).on("value", function(snapshot) {
            //console.log("Snapshot from action " , snapshot.val())
            snapshot.forEach(child => {
                //console.log("child ", child.val().availableSpots)
                dispatch({ type: GET_EVENT_COUNT, payload: child.val().availableSpots });
            })
          });
    };
  };

  export const updateCount = (uuid) => {
    console.log("Index UUUID " , uuid);
    foundKey = '';
    return (dispatch) => {
        var ref = firebase.database().ref('Events/');
        ref.orderByChild("uuid").equalTo(uuid).once("value", function(snapshot) {
            //console.log("Snapshot from action " , snapshot.val())
            snapshot.forEach(child => {
                console.log("Current Spots ", child.val().availableSpots)
                var decrement = (child.val().availableSpots) -1
                console.log("Remove Spots ", decrement)
                child.ref.update({ availableSpots: decrement});

                //dispatch({ type: GET_EVENT_COUNT, payload: decrement });
            })
          });
    };
  };


export const fetchingStart = () => ({type: FETCH_BEGIN});

export const fetchingSuccess = ar => ({
    type: FETCH_SUCCESS,
    payload: ar
});

export const listFetchingStart = () => ({type: LIST_FETCH_BEGIN})

export const listFetchingSuccess = () => ({type: LIST_FETCH_SUCCESS})

export const getAllEvents = () => {
    var a =[]
      return (dispatch) => {
        dispatch(fetchingStart());
        try {
            var ref = firebase.database().ref('Events/');
            ref.orderByChild("epochTime").on("value", function(snapshot) {
                //console.log("Snapshot from action " , snapshot.val())
                snapshot.forEach(child => {
                    a.push(child.val())
                })
                console.log("Array dispatch ", a)
                dispatch(fetchingSuccess(a))
                //dispatch({ type: GET_EVENT_LIST, payload: a });
                
              });
        } catch(error) {
            console.log("Error ", error);
        }
        
      }
  }

  export const getListBalanced = (uuid) => {
    return (dispatch) => {
      dispatch(listFetchingStart())
      var ref = firebase.database().ref('TeamsList/' + uuid);
      ref.on('value', function(snapshot){

        if (snapshot.hasChild("whiteTeam")) {
          console.log("White team exists")
          dispatch({ type: WHITE_TEAM, payload: snapshot.val().whiteTeam})
        } else {
          console.log("White team does not exist")
          dispatch({ type: WHITE_TEAM_DNE })
        }

        if (snapshot.hasChild("blackTeam")) {
          console.log("Black team exists")
          dispatch({ type: BLACK_TEAM, payload: snapshot.val().blackTeam})
        } else {
          console.log("BLack team does not exist")
          dispatch({ type: BLACK_TEAM_DNE })
        }

        dispatch({ type: BALANCE_TEAMS, payload: snapshot.val()})
        
        // var whiteTeam = snapshot.val().whiteTeam
        // var blackTeam = snapshot.val().blackTeam
        
        
        // dispatch({type: WHITE_TEAM, payload: whiteTeam})
        // //dispatch({})
        // dispatch({type: BALANCE_TEAMS, payload: snapshot.val()})
      })
    }
  }
