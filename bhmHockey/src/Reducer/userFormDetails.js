import { GET_USER_FIRSTNAME, GET_USER_LASTNAME, GET_USER_PLAYINGEXP, GET_USER_EMAIL, GET_FLAG } from '../actions/types';
const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    level: '',
    email: '',
    creator: ''
};

const userFormDetails = (state = INITIAL_STATE, action) => {
    

    switch (action.type){
        case GET_USER_FIRSTNAME:
            console.log("actionUseras", action.payload);
            //return state.user.push(action.payload);
            return {...state, firstName: action.payload};
        case GET_USER_LASTNAME:
            console.log("LastName action ", action.payload);
            return {...state, lastName: action.payload};
        case GET_USER_PLAYINGEXP:
            return {...state, level: action.payload};
        case GET_USER_EMAIL:
            return {...state, email: action.payload};
        case GET_FLAG:
            console.log("Flags ", action.payload)
            return {...state, creator: action.payload};
        default:
        console.log("default1 ");
            return state;
    }

};

export default userFormDetails;