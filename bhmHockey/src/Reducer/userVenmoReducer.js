import { GET_USER_VENMO, GET_USER_PRICE } from '../actions/types';
const INITIAL_STATE = {
    price: '',
    venmo: ''
};



const userVenmoReducer = (state = INITIAL_STATE, action) => {
    

    switch (action.type){
        case GET_USER_VENMO:
            console.log("Venmo details ", action.payload);
            return {...state, venmo: action.payload};
        case GET_USER_PRICE:
            return {...state, price: action.payload};
        default:
        console.log("default ");
            return state;
    }

};

export default userVenmoReducer;