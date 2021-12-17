const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';
const SET_USER_PAGE = 'SET-USER-PAGE';
const CHANGE_PHOTO_SIZE = 'CHANGE-PHOTO-SIZE';

let initialState = {
        postsData: [
            {id:1, text:'breaps, i love dicks', likesCount:228},
            {id:2, text:'lets celebrate and suck some dick', likesCount:1488}
        ],
        userPage: null,
        userPhoto: null,
        newPostText:''
};


const profileReducer = (state = initialState, action) => {
    
    switch(action.type){
        case ADD_POST: {
            if(state.newPostText == ''){
                return state;
            }
            let newPost = {
                id: state.postsData.length + 1,
                text: state.newPostText,
                likesCount: 0
            };
            let stateCopy = {...state};
            stateCopy.postsData = [...state.postsData];
            stateCopy.postsData.push(newPost);
            stateCopy.newPostText = '';
            return stateCopy;
        }

        case UPDATE_POST_TEXT: {
            let stateCopy = {...state};
            stateCopy.newPostText = action.newText;
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

        default: {
            return state;
        }

    }

}

export const addPost = () => ({type: ADD_POST});
export const setUserPage = (userData) => ({type: SET_USER_PAGE, userData});
export const updatePostText = (text) => ({type: UPDATE_POST_TEXT, newText: text});
export const changePhotoSize = () => ({type: CHANGE_PHOTO_SIZE});

export default profileReducer;