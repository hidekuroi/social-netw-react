
let ws: WebSocket | null = null;

const closeHandler = () => {
    setTimeout(createChannel, 3000)
}

function createChannel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws.addEventListener('close', closeHandler)
  }

export const chatAPI = {
    subscribe() {
        createChannel()
    },
    unsubscribe() {
        ws?.removeEventListener('close', closeHandler)
        ws?.close()

    }
}