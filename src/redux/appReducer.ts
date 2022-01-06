import { authCheck } from "./authReducer";

const SET_INITIALIZED = '/app/SET-INITIALIZED';
const THEME_CHANGE = '/app/THEME-CHANGE';

type InitialStateType = {
    isInitialized: boolean,
    darkTheme: boolean
}

const initialState: InitialStateType = {
    isInitialized: false,
    darkTheme: false
}

export default (state = initialState, action:any):InitialStateType => {
    switch (action.type) {
        
    case SET_INITIALIZED:
        return { ...state, isInitialized: true}

    case THEME_CHANGE:
        return { ...state, darkTheme: !state.darkTheme}

    default:
        return state
    }
}

type SetInitializedType = {
    type: typeof SET_INITIALIZED
}

type ChangeThemeType = {
    type: typeof THEME_CHANGE
}

export const setInitialized = ():SetInitializedType => ({type: SET_INITIALIZED});
export const changeTheme  = ():ChangeThemeType => ({type:THEME_CHANGE});



export const initializeApp = () => {
    return (dispatch:any) => {
        let promises = [dispatch(authCheck())];

        Promise.all(promises)
        .then(() => {
            dispatch(setInitialized());
        });
    }
}
