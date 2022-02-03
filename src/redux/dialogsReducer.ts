import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { dialogsApi } from "../api/dialogs-api";
import { profileAPI } from "../api/profile-api";
import { MessageType, PhotosType, UserPageType } from "../types/types";
import { InferActionsType, RootState } from "./redux-store";

const SEND_MESSAGE = '/messenger/SEND-MESSAGE';
const SET_NEW_MESSAGES_COUNT = '/messenger/SET-NEW-MESSAGES-COUNT'
const SET_MESSAGES = 'messenger/SET-MESSAGES'
const SET_COMPANION_DATA = 'messenger/SET-COMPANION-DATA'
const SET_DIALOGS_DATA = 'messenger/SET-DIALOGS-DATA'
const CHANGE_COMPANION_ID = 'messenger/CHANGE-COMPANION-ID'

// type MessageType = {
//     id: number,
//     message: string
// }

export type DialogType = {
    id: number,
    name: string
}

export type DialogItemType = {
    id: number,
    userName: string,
    hasNewMessages: boolean,
    lastDialogActivityDate: string,
    lastUserActivityDate: string,
    newMessagesCount: number,
    photos: PhotosType
}

export type DialogsInitialStateType = {
    // messagesData: Array<MessageType>,
    companionData: UserPageType
    apiMessagesData: Array<MessageType>,
    dialogsData: Array<DialogItemType>,
    newMessagesCount: number | null,
    companionId: number,
}

let initialState: DialogsInitialStateType = {
    // messagesData: [
    //     {id: 1, message: 'Ты Евгений Цыганов?'},
    //     {id: 2, message: 'если да, пошёл нахуй'},
    //     {id: 3, message: 'если нет, пошёл нахуй пиздабол'}
    // ],
    companionData: {aboutMe: '',
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
        small: '',
        large: ''
    }},
    companionId: 0,
    apiMessagesData: [],
    dialogsData: [],
    newMessagesCount: null
};


const dialogsReducer = (state = initialState, action: any): DialogsInitialStateType => {
    switch(action.type){
        // case SEND_MESSAGE: {
        //     let newMessage = {
        //         id: state.messagesData.length + 1,
        //         message: action.messageData.messengerInput,
        //     };
        //     let stateCopy = {...state};
        //     stateCopy.messagesData = [...state.messagesData];
        //     stateCopy.messagesData.push(newMessage);
        //     return stateCopy;
        // }
        case SET_NEW_MESSAGES_COUNT: {
            console.log(action.count)
            return {...state, newMessagesCount: action.count}
        }

        case SET_MESSAGES: {
            return {...state, apiMessagesData: action.messages}
        }

        case SET_COMPANION_DATA: {
            return {...state, companionData: action.userData}
        }

        case SET_DIALOGS_DATA: {
            return {...state, dialogsData: action.dialogItems}
        }

        case CHANGE_COMPANION_ID: {
            return {...state, companionId: action.id}
        }
        
        default: {
            return state;
        }
    }
}


type ActionsTypes = InferActionsType<typeof actions>

export const actions = {
    setNewMessagesCount: (count: number) => ({type: SET_NEW_MESSAGES_COUNT, count} as const),
    sendMessage: (messageData: {messengerInput: string}) => ({type: SEND_MESSAGE, messageData} as const),
    setMessages: (messages: Array<MessageType>) => ({type: SET_MESSAGES, messages} as const),
    setDialogsData: (dialogItems: DialogItemType[]) => ({type: SET_DIALOGS_DATA, dialogItems} as const),
    changeCompanionId: (id: number) => ({type: CHANGE_COMPANION_ID, id} as const),

    setCompanionData: (userData: UserPageType) => ({type: SET_COMPANION_DATA, userData} as const),
} 


type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsTypes>


export const getUnreadMessagesCount = (): ThunkType => {
    return async (dispatch: DispatchType) => {
        try{
        let data = await dialogsApi.getNewMessagesCount();
            dispatch(actions.setNewMessagesCount(data));
        }catch{
            console.error('You are not signed in')
        }
    }
}

export const sendMessageAPI = (userId: number, message: string): ThunkType => {
    return async (dispatch: any) => {
        let data = await dialogsApi.sendMessage(userId, message);
            dispatch(actions.sendMessage({messengerInput: message}))
            dispatch(getMessages(userId))
    }
}

export const getMessages = (userId: number, page = 1, count = 10): ThunkType => {
    return async (dispatch: DispatchType) => {
        let data = await dialogsApi.getMessages(userId, page, count);
            dispatch(actions.setMessages(data.items))
    }
}

export const getCompanionData = (userId: number ): ThunkType => {
    return async (dispatch: DispatchType) => {
        try{
        let data = await profileAPI.getProfile(userId);
        dispatch(actions.setCompanionData(data));
        }
        catch{
            console.error('You are not signed in')
        }
    }
}

export const getDialogs = (): ThunkType => {
    return async (dispatch: DispatchType) => {
        let data = await dialogsApi.getDialogs();
        console.log(data);
            dispatch(actions.setDialogsData(data))
    }
}

export default dialogsReducer;