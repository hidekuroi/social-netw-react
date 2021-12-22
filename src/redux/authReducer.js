import { authAPI } from "../api/api";
const SUCCESFUL_SIGN_IN = 'SUCCESFUL-SIGN-IN'
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

    case SUCCESFUL_SIGN_IN: 
        return {...state, isAuth: true}
        
    default:
        return state;
    }
}

export const setAuthUser = (authData) => ({type: SET_AUTH_USER, authData});
export const succesfulSignIn = () => ({type: SUCCESFUL_SIGN_IN});


export const authCheck = () => {
    return (dispatch) => {
        authAPI.isAuth()
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
                dispatch(succesfulSignIn());
            }
        });
    }
}
