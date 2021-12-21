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
        if(action.authData.resultCode == 0) {
            let stateCopy = { ...state, ...action.authData.data};
            stateCopy.isAuth = true;
            return stateCopy;
        }
        else{
            return state;
        }
        

    default:
        return state;
    }
}

export const setAuthUser = (authData) => ({type: SET_AUTH_USER, authData});


export const authCheck = () => {
    return (dispatch) => {
        authAPI.isAuth()
        .then(data => {
            dispatch(setAuthUser(data));
        });
    }
}
