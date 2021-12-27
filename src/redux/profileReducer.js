import { profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PAGE = 'SET-USER-PAGE';
const CHANGE_PHOTO_SIZE = 'CHANGE-PHOTO-SIZE';
const SET_STATUS = 'SET-STATUS';

let initialState = {
        postsData: [
            {id:1, text:'breaps, i love dicks', likesCount:228},
            {id:2, text:'lets celebrate and suck some dick', likesCount:1488}
        ],
        userPage: null,
        userPhoto: null,
        status: '',
};


const profileReducer = (state = initialState, action) => {
    
    switch(action.type){
        case ADD_POST: {
            if(!action.postText){
                return state;
            }
            let newPost = {
                id: state.postsData.length + 1,
                text: action.postText,
                likesCount: 0
            };
            let stateCopy = {...state};
            stateCopy.postsData = [...state.postsData];
            stateCopy.postsData.push(newPost);
            return stateCopy;
        }

        case SET_USER_PAGE: {
            let stateCopy = {...state, userPage: action.userData, userPhoto: action.userData.photos.small};
            return stateCopy;
        }

        case CHANGE_PHOTO_SIZE: {
                if(state.userPage.photos.small == state.userPhoto) {
                    let stateCopy = {...state, userPhoto: state.userPage.photos.large};
                    return stateCopy;
                }else {
                    let stateCopy = {...state, userPhoto: state.userPage.photos.small};
                    return stateCopy;
                }
        }

        case SET_STATUS: {
            return {...state, status: action.status}
        }

        default: {
            return state;
        }

    }

}

export const addPost = (postData) => ({type: ADD_POST, postText: postData.addPostField});
export const setUserPage = (userData) => ({type: SET_USER_PAGE, userData});
export const changePhotoSize = () => ({type: CHANGE_PHOTO_SIZE});
export const setStatus = (status) => ({type: SET_STATUS, status});


export const getProfile = (userId) => {
    return (dispatch) => {
        profileAPI.getProfile(userId)
        .then(data => {
            dispatch(setUserPage(data));
        });        
    }
}

export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId)
        .then(data => {
            dispatch(setStatus(data));
        });
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
        .then(data => {
            if(data.resultCode === 0){
                dispatch(setStatus(status));
            }
        });
    }
}


export default profileReducer;