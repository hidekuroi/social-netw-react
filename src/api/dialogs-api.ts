import { DialogItemType } from "../redux/dialogsReducer";
import { MessageType } from "../types/types";
import { DefaultResponseType, instance } from "./api";


interface SendMessageResponseType extends DefaultResponseType {
    fieldsErrors: Array<string>
}
type GetMessagesResponseType = {
    items: Array<MessageType>
    totalCount: number
    error: null | any
}

type GetDialogsResponseType = Array<DialogItemType>

export const dialogsApi = {
    getNewMessagesCount() {
        return instance.get<number>('dialogs/messages/new/count')
        .then(response => response.data)
    },
    sendMessage(userId: number, message: string) {
        return instance.post<SendMessageResponseType>(`dialogs/${userId}/messages`, {body: message})
        .then(response => response.data)
    },
    getMessages(userId: number, page = 1, count = 10) {
        return instance.get<GetMessagesResponseType>(`dialogs/${userId}/messages?count=${count}&page=${page}`)
        .then(response => response.data)
    },
    getDialogs() {
        return instance.get<GetDialogsResponseType>(`dialogs`)
        .then(response => response.data)
    }    

}