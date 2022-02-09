import { getProfile } from './profileReducer';
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { authCheck } from "./authReducer";
import { RootState } from "./redux-store";

const SET_INITIALIZED = '/app/SET-INITIALIZED';

type InitialStateType = {
}

const initialState: InitialStateType = {
}

export default (state = initialState, action:any):InitialStateType => {
    switch (action.type) {
        
    case SET_INITIALIZED:
        return { ...state, isInitialized: true}

    default:
        return state
    }
}

type ActionsTypes = SetInitializedType

type SetInitializedType = {
    type: typeof SET_INITIALIZED
}


type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsTypes>

export const setInitialized = ():SetInitializedType => ({type: SET_INITIALIZED});



export const initializeApp = () => {
    return (dispatch:any) => {
                
    }
}
