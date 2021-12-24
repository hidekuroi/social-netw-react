import { authCheck } from "./authReducer";

const SET_INITIALIZED = 'SET-INITIALIZED';
const THEME_CHANGE = 'THEME-CHANGE';


const initialState = {
    isInitialized: false,
    darkTheme: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        
    case SET_INITIALIZED:
        return { ...state, isInitialized: true}

    case THEME_CHANGE:
        return { ...state, darkTheme: !state.darkTheme}

    default:
        return state
    }
}

export const setInitialized = (isInitialized) => ({type: SET_INITIALIZED});
export const changeTheme  = () => ({type:THEME_CHANGE});

export const initializeApp = () => {
    return (dispatch) => {
        let promises = [dispatch(authCheck())];

        Promise.all(promises)
        .then(() => {
            dispatch(setInitialized());
        });
    }
}
