import { ChatMessageAPIType, chatAPI, StatusType } from './../api/chat-api';
import { getProfile } from './profileReducer';
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { authCheck } from "./authReducer";
import { InferActionsType, RootState } from "./redux-store";
import {v1} from 'uuid'

const MESSAGES_RECEVIED = '/chat/MESSAGES-RECEVIED';
const CHANGE_STATUS = '/chat/STATUS-CHANGED';
const CLEAN_MESSAGES = '/chat/CLEAN-MESSAGES'

export type ChatMessageType = ChatMessageAPIType & {id: string}

type InitialStateType = {
    messages: Array<ChatMessageType>,
    status: StatusType
}

const initialState: InitialStateType = {
    messages: [],
    status: 'pending'
}

const chatReducer = (state = initialState, action:any):InitialStateType => {
    switch (action.type) {
        
    case MESSAGES_RECEVIED:
        return {
            ...state,
            //@ts-ignore
            messages: [...state.messages, ...action.messages.map( m => ({...m, id: v1()}))].filter((m, index, array) => index >= array.length - 100)
        }
    case CHANGE_STATUS:
        return {
            ...state,
            status: action.status
        }
    case CLEAN_MESSAGES:
        return{ ...state,
        messages:[]
        }
    default:
        return state
    }
}

type ActionsTypes = InferActionsType<typeof actions>

export const actions = {
    messagesRecevied: (messages: ChatMessageAPIType[]) => ({type: MESSAGES_RECEVIED, messages} as const),
    cleanMessages: () => ({type: CLEAN_MESSAGES} as const),
    changeStatus: (status: StatusType) => ({type: CHANGE_STATUS, status} as const)
} 

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: DispatchType) => {
    if(_newMessageHandler === null){
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesRecevied(messages))
            }
    }
    return _newMessageHandler
}

let _statusChangeHandler: ((status: StatusType) => void) | null = null;
const statusChangeHandlerCreator = (dispatch: DispatchType) => {
    if(_statusChangeHandler === null){
        _statusChangeHandler = (status) => {
            dispatch(actions.changeStatus(status))
            }
    }
    return _statusChangeHandler
}


type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsTypes>

export const startMessageListening = (): ThunkType => {
    return async (dispatch: DispatchType) => {
        chatAPI.start()
        chatAPI.subscribe('message-receive', newMessageHandlerCreator(dispatch))
        chatAPI.subscribe('status-change', statusChangeHandlerCreator(dispatch))
    }
}

export const stopMessageListening = (): ThunkType => {
    return async (dispatch: DispatchType) => {
        chatAPI.unsubscribe('message-receive', newMessageHandlerCreator(dispatch))
        chatAPI.unsubscribe('status-change', statusChangeHandlerCreator(dispatch))
        chatAPI.stop()
    }
}

export const sendMessage = (message: string): ThunkType => {
    return async (dispatch: DispatchType) => {
        chatAPI.sendMessage(message)
    }
}

export default chatReducer;
