import { userConstants } from "../_constans/user.constants";

// let user = localStorage.getItem('user');

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { 
    loggedIn: true, 
    user,
 } : {
     loggedIn: false,
 };

export function users(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggedIn: true,
                user: action.user.data,
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user.data,
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state;
    }

    
}