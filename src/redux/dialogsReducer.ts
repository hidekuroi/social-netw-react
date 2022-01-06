const SEND_MESSAGE = '/messenger/SEND-MESSAGE';

type MessageType = {
    id: number,
    message: string
}

type DialogType = {
    id: number,
    name: string
}

type InitialStateType = {
    messagesData: Array<MessageType>,
    dialogsData: Array<DialogType>,
    messengerInputField: string
}

let initialState: InitialStateType = {
    messagesData: [
        {id: 1, message: 'Ты Евгений Цыганов?'},
        {id: 2, message: 'если да, пошёл нахуй'},
        {id: 3, message: 'если нет, пошёл нахуй пиздабол'}
    ],
    dialogsData: [
        {id: 1, name: 'Breapster'},
        {id: 2, name: 'Broadcaster'},
        {id: 3, name: 'Circ.lek'},
        {id: 4, name: 'Vasya Govnyuchenko'}
    ],
    messengerInputField: ''
};


const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch(action.type){
        case SEND_MESSAGE: {
            console.log(action);
            let newMessage = {
                id: state.messagesData.length + 1,
                message: action.messageData.messengerInput,
            };
            let stateCopy = {...state};
            stateCopy.messagesData = [...state.messagesData];
            stateCopy.messagesData.push(newMessage);
            return stateCopy;
        }
        
        default: {
            return state;
        }
    }
}

type SendMessageType = {
    type: typeof SEND_MESSAGE,
    messageData: {messengerInput: string}
}

export const sendMessage = (messageData: {messengerInput: string}): SendMessageType => ({type: SEND_MESSAGE, messageData});


export default dialogsReducer;