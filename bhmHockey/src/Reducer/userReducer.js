import { GET_USER } from '../actions/types';
const INITIAL_STATE = {
    user: []
};

const userReducer = (state = INITIAL_STATE, action) => {
    

    switch (action.type){
        case GET_USER:
            console.log("actionUser ", action.payload);
            //return state.user.push(action.payload);
            return action.payload
        default:
        console.log("default ");
            return state;
    }

};

export default userReducer;