import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { profileAPI } from "../api/api";
import { PhotosType, UserPageType, PostType } from "../types/types";
import { InferActionsType, RootState } from "./redux-store";

//do not forget to add types for actions; and delete this "!"

const ADD_POST = '/profile/ADD-POST';
const SET_USER_PAGE = '/profile/SET-USER-PAGE';
const CHANGE_PHOTO_SIZE = '/profile/CHANGE-PHOTO-SIZE';
const SET_STATUS = '/profile/SET-STATUS';
const DELETE_POST = '/profile/DELETE-POST';
const CHANGE_PHOTO = '/profile/CHANGE-PHOTO';


type InitialStateType = {
    postsData: Array<PostType>,
    userPage: UserPageType | null,
    userPhoto: string | null,
    status: string
}

let initialState: InitialStateType = {
        postsData: [
            {id:1, text:'breaps, i love dicks', likesCount:228},
            {id:2, text:'lets celebrate and suck some dick', likesCount:1488}
        ],
        userPage: null,
        userPhoto: null,
        status: '',
};


const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    
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

        case DELETE_POST: {
            return {...state, postsData: state.postsData.filter(p => p.id !== action.postId)}
        }

        case SET_USER_PAGE: {
            let stateCopy = {...state, userPage: action.userData, userPhoto: action.userData.photos.small};
            return stateCopy;
        }

        case CHANGE_PHOTO_SIZE: {
                if(state.userPage!.photos.small === state.userPhoto) {
                    let stateCopy = {...state, userPhoto: state.userPage!.photos.large};
                    return stateCopy;
                }else {
                    let stateCopy = {...state, userPhoto: state.userPage!.photos.small};
                    return stateCopy;
                }
        }

        case CHANGE_PHOTO: {
            if(state.userPage!.photos!.small === state.userPhoto){
                let stateCopy = {...state, userPhoto: action.photos.small}
            if(stateCopy.userPage){
                stateCopy.userPage.photos = action.photos;
            }
                return stateCopy;
            }else {
                let stateCopy = {...state, userPhoto: action.photos.large}
                stateCopy.userPage!.photos = {...action.photos};
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


type ActionsTypes = InferActionsType<typeof actions>

export const actions = {
    addPost: (postData: any) => ({type: ADD_POST, postText: postData.addPostField} as const),
    setUserPage: (userData: UserPageType) => ({type: SET_USER_PAGE, userData} as const),
    changePhotoSize: () => ({type: CHANGE_PHOTO_SIZE} as const),
    setStatus: (status: string) => ({type: SET_STATUS, status} as const),
    deletePost: (postId: number) => ({type: DELETE_POST, postId} as const),
    changePhoto: (photos: {small: string | null, large: string | null}) => ({type: CHANGE_PHOTO, photos} as const)
} 


type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsTypes>

export const getProfile = (userId: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        try{
        let data = await profileAPI.getProfile(userId);
        dispatch(actions.setUserPage(data));
        }
        catch{
            console.error('You are not signed in')
        }
    }
}


export const getStatus = (userId: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        try{
        let data = await profileAPI.getStatus(userId);
            dispatch(actions.setStatus(data));
        }catch{
            console.error('You are not signed in')
        }
    }
}

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch: DispatchType) => {
        let data = await profileAPI.updateStatus(status);
            if(data.resultCode === 0){
                dispatch(actions.setStatus(status));
            }
    }
}

export const uploadPhoto = (file: any): ThunkType => {
    return async (dispatch: DispatchType) => {
        let data = await profileAPI.uploadPhoto(file);
            if(data.data.resultCode === 0){
                console.log(data.data)
                dispatch(actions.changePhoto(data.data.data.photos));
            }
    }
}

export const uploadInfo = (info: any): ThunkType => {
    return async (dispatch: any) => {
        let data = await profileAPI.uploadInfo(info);
            if(data.resultCode === 0){
                dispatch(getProfile(info.userId));
            }
    }
}


export default profileReducer;