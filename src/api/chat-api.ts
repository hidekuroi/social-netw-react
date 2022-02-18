import { cleanup } from "@testing-library/react";

let ws: WebSocket | null = null;

type EventsType = 'message-receive' | 'status-change'

let subscribers = {
    'message-receive': [] as MessageReceiveSubscriberType[],
    'status-change': [] as StatusChangeSubscriberType[]
}


const closeHandler = () => {
    statusNotifier('pending')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subscribers['message-receive'].forEach(s => s(newMessages))
}

const errorHandler = () => {
    statusNotifier('error')
    console.error('REFRESH PAGE')
}

const openHandler = () => {
    statusNotifier('ready')
}

const statusNotifier = (status: StatusType) => {
    subscribers['status-change'].forEach(s => s(status))
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

function createChannel() {
    cleanup()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    statusNotifier('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
  }


export const chatAPI = {
    start() {
        createChannel()
    },
    stop(){
        subscribers['message-receive'] = []
        subscribers['status-change'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(event: EventsType, callback: MessageReceiveSubscriberType | StatusChangeSubscriberType) {
        //@ts-ignore
        subscribers[event].push(callback)
    },
    unsubscribe(event: EventsType, callback: MessageReceiveSubscriberType| StatusChangeSubscriberType) {
        //@ts-ignore
        subscribers[event] = subscribers[event].filter(s => s !== callback)
        ws?.removeEventListener('close', closeHandler)
        ws?.close()
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

type MessageReceiveSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangeSubscriberType = (status: StatusType) => void

export type StatusType = 'pending' | 'ready' | 'error'

export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}