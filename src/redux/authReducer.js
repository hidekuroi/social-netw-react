import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";
const SET_AUTH_USER = 'SET-AUTH-USER';

const initialState = {
        id: null,
        login: null,
        email: null,
        isAuth: false
}

export default (state = initialState, action) => {
    switch (action.type) {

    case SET_AUTH_USER:
        if(action.authData) {
            if(action.authData.resultCode == 0){
                let stateCopy = { ...state, ...action.authData.data};
                stateCopy.isAuth = true;
                return stateCopy;
            }
        }
        else if(!action.authData){
            let stateCopy = {...state};
            stateCopy.login = null;
            stateCopy.email = null;
            stateCopy.id = null;
            stateCopy.isAuth = false;
            
            return stateCopy;
        }

    default:
        return state;
    }
}

export const setAuthUser = (authData) => ({type: SET_AUTH_USER, authData});


export const authCheck = () => {
    return (dispatch) => {
       return authAPI.isAuth()
        .then(data => {
            dispatch(setAuthUser(data));
        });
    }
}

export const signIn = (formData) => {
    return (dispatch) => {
        authAPI.login(formData)
        .then(data => {
            if(data.resultCode === 0){
                dispatch(authCheck());
                
            }
            else{
                let message = data.messages.length > 0 ? data.messages[0] : 'Unknown error';
                dispatch(stopSubmit('login',{_error: message}));
            }
        });
    }
}

export const signOut = () => {
    return (dispatch) => {
        authAPI.logout()
        .then(data => {
            if(data.resultCode === 0){
                dispatch(setAuthUser());
            }
        });
    }
}
