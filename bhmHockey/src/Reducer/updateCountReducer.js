

import { GET_EVENT_COUNT } from '../actions/types';
const INITIAL_STATE = 0;

const updateCountReducer = (state = INITIAL_STATE, action) => {
    

    switch (action.type){
        case GET_EVENT_COUNT:
            console.log("action count", action.payload);
            
            return action.payload;

          
        default:
        console.log("default ");
            return state;
    }

};

export default updateCountReducer;