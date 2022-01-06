import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_AUTH_USER = '/auth/SET-AUTH-USER';
const SET_CAPTCHA_URL = '/auth/SET-CAPTCHA-URL'

type InitialStateType = {
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean,
    captchaUrl: string | null
}

const initialState: InitialStateType = {
        id: null,
        login: null,
        email: null,
        isAuth: false,
        captchaUrl: null
}

export default (state = initialState, action: any): InitialStateType => {
    switch (action.type) {

    case SET_AUTH_USER:
        if(action.authData) {
            if(action.authData.resultCode === 0){
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
    case SET_CAPTCHA_URL:
        return {...state, captchaUrl: action.captchaUrl}

    default:{
        return state;
    }
    }
}

type SetAuthUserType = {
    type: typeof SET_AUTH_USER,
    authData: {id: number, login: string, email: string, isAuth: boolean} | null
}

type SetCaptchaUrlType = {
    type: typeof SET_CAPTCHA_URL,
    captchaUrl: string | null
}

export const setAuthUser = (authData: {id: number, login: string, email: string, isAuth: boolean} | null): SetAuthUserType => ({type: SET_AUTH_USER, authData});
const setCaptchaUrl = (captchaUrl: string | null): SetCaptchaUrlType => ({type: SET_CAPTCHA_URL, captchaUrl});


export const authCheck = () => {
    return async (dispatch: any) => {
       let data = await authAPI.isAuth();
            dispatch(setAuthUser(data));
    }
}

export const signIn = (formData: any) => {
    return async (dispatch: any) => {
        let data = await authAPI.login(formData);
            if(data.resultCode === 0){
                dispatch(authCheck());
                dispatch(setCaptchaUrl(null));
            }
            else{
                if(data.resultCode === 10) {
                    dispatch(getCaptcha());
                }
                let message = data.messages.length > 0 ? data.messages[0] : 'Unknown error';
                dispatch(stopSubmit('login',{_error: message}));
            }
    }
}

export const signOut = () => {
    return async (dispatch: any) => {
        let data = await authAPI.logout();
            if(data.resultCode === 0){
                dispatch(setAuthUser(null));
            }
    }
}

export const getCaptcha = () => {
    return async (dispatch: any) => {
        const data = await securityAPI.getCaptcha();
        const captchaUrl: string = data.url;
        dispatch(setCaptchaUrl(captchaUrl));
        
    }
}
