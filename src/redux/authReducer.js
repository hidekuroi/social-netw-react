const SET_AUTH_USER = 'SET-AUTH-USER';

const initialState = {
        id: null,
        login: null,
        email: null
}

export default (state = initialState, action) => {
    switch (action.type) {

    case SET_AUTH_USER:
        let stateCopy = { ...state, ...action.authData }
        return stateCopy;

    default:
        return state
    }
}

export const setAuthUser = (authData) => ({type: SET_AUTH_USER, authData});
