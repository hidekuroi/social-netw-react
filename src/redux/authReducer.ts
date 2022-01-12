import { IsAuthResponseType, ResultCodeEnum } from './../api/api';
import { Dispatch } from "redux";
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { authAPI, ResultCodeForCaptcha, securityAPI } from "../api/api";
import { RootState } from "./redux-store";

const SET_AUTH_USER = '/auth/SET-AUTH-USER';
const SET_CAPTCHA_URL = '/auth/SET-CAPTCHA-URL'

export type AuthInitialStateType = {
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean,
    captchaUrl: string | null
}

const initialState: AuthInitialStateType = {
        id: null,
        login: null,
        email: null,
        isAuth: false,
        captchaUrl: null
}

export default (state = initialState, action: any): AuthInitialStateType => {
    switch (action.type) {

    case SET_AUTH_USER:
        if(action.authData) {
            if(action.authData.resultCode === ResultCodeEnum.Success){
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

type ActionsTypes = SetAuthUserType | SetCaptchaUrlType

type AuthDataType = IsAuthResponseType;

type SetAuthUserType = {
    type: typeof SET_AUTH_USER,
authData: AuthDataType | null
}

type SetCaptchaUrlType = {
    type: typeof SET_CAPTCHA_URL,
    captchaUrl: string | null
}

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsTypes>

export const setAuthUser = (authData: AuthDataType | null): SetAuthUserType => ({type: SET_AUTH_USER, authData});
const setCaptchaUrl = (captchaUrl: string | null): SetCaptchaUrlType => ({type: SET_CAPTCHA_URL, captchaUrl});


export const authCheck = (): ThunkType => {
    return async (dispatch: DispatchType) => {
       let data = await authAPI.isAuth();
            dispatch(setAuthUser(data.data));
    }
}

export type signInData = {
    email: string,
    password: string,
    rememberMe: boolean | null,
    captcha: string | null
}

export const signIn = (formData: signInData): ThunkType => {
    return async (dispatch: any) => {
        let data = await authAPI.login(formData);
            if(data.resultCode === ResultCodeForCaptcha.Success){
                dispatch(authCheck());
                dispatch(setCaptchaUrl(null));
            }
            else{
                if(data.resultCode === ResultCodeForCaptcha.Captcha) {
                    dispatch(getCaptcha());
                }
                let message = data.messages.length > 0 ? data.messages[0] : 'Unknown error';
                dispatch(stopSubmit('login',{_error: message}));
            }
    }
}

export const signOut = (): ThunkType => {
    return async (dispatch: DispatchType) => {
        let data = await authAPI.logout();
            if(data.resultCode === 0){
                dispatch(setAuthUser(null));
            }
    }
}

export const getCaptcha = (): ThunkType => {
    return async (dispatch: DispatchType) => {
        const data = await securityAPI.getCaptcha();
        const captchaUrl: string = data.url;
        dispatch(setCaptchaUrl(captchaUrl));
        
    }
}
