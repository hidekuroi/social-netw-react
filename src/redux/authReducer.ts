import { profileAPI } from './../api/profile-api';
import { DefaultResponseType, ResultCodeEnum } from './../api/api';
import { IsAuthResponseType } from '../api/auth-api';
import { Dispatch } from "redux";
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { ResultCodeForCaptcha } from "../api/api";
import { securityAPI } from '../api/security-api';
import { authAPI } from '../api/auth-api';
import { InferActionsType, RootState } from "./redux-store";
import { getProfile } from './profileReducer';
import { UserPageType } from '../types/types';
import { getUnreadMessagesCount } from './dialogsReducer';

let spot = 'https://vk.com/sticker/1-64142-512';

const SET_AUTH_USER = '/auth/SET-AUTH-USER';
const SET_CAPTCHA_URL = '/auth/SET-CAPTCHA-URL';
const SET_SIGNEDIN_USER_PAGE = '/auth/SETSIGNEDIN-USER-Page';


export type AuthInitialStateType = {
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean,
    captchaUrl: string | null,
    signedInUserPage: UserPageType,

}

const initialSignedInUserPageData = {aboutMe: '',
contacts: {facebook: '',
website: '',
vk: '',
twitter: '',
instagram: '',
youtube: '',
github: '',
mainLink: '',}
,
lookingForAJob: false,
lookingForAJobDescription: '',
fullName: '',
userId: 0,
photos: {
    small: spot,
    large: spot
}}

const initialState: AuthInitialStateType = {
        id: null,
        login: null,
        email: null,
        isAuth: false,
        captchaUrl: null,

        signedInUserPage: initialSignedInUserPageData,

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

    case SET_SIGNEDIN_USER_PAGE: {
        if(action.userData){
            let stateCopy = {...state, signedInUserPage: action.userData}
            return stateCopy;
        }
        else return state

        
    }

    default:{
        return state;
    }
    }
}

type ActionsTypes = InferActionsType<typeof actions>

export const actions = {
    setAuthUser: (authData: DefaultResponseType<IsAuthResponseType> | null) => ({type: SET_AUTH_USER, authData}),
    setCaptchaUrl: (captchaUrl: string | null) => ({type: SET_CAPTCHA_URL, captchaUrl}),
    setSignedInUserPage: (userData: UserPageType) => ({type: SET_SIGNEDIN_USER_PAGE, userData} as const),
}


type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsTypes>

export const getSignedInUserPageData = (id: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        let data = await profileAPI.getProfile(id);
            dispatch(actions.setSignedInUserPage(data));
    }
}

export const authCheck = (): ThunkType => {
    return async (dispatch: DispatchType | any) => {
       let data = await authAPI.isAuth();
            dispatch(actions.setAuthUser(data.data));
            dispatch(getSignedInUserPageData(data.data.data.id))            
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
                dispatch(actions.setCaptchaUrl(null));
                dispatch(getUnreadMessagesCount())
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
                dispatch(actions.setAuthUser(null));
                dispatch(actions.setSignedInUserPage(initialSignedInUserPageData));
            }
    }
}

export const getCaptcha = (): ThunkType => {
    return async (dispatch: DispatchType) => {
        const data = await securityAPI.getCaptcha();
        const captchaUrl: string = data.url;
        dispatch(actions.setCaptchaUrl(captchaUrl));
        
    }
}
