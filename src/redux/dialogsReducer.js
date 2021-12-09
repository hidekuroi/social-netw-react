const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_MESSENGER_INPUT = 'UPDATE-MESSENGER-INPUT';

let initialState = {
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


const dialogsReducer = (state = initialState, action) => {
    switch(action.type){
        case SEND_MESSAGE:
            let newMessage = {
                id: state.messagesData.length + 1,
                message: state.messengerInputField,
            };
            state.messagesData.push(newMessage);
            state.messengerInputField = '';
            return state;
            
        case UPDATE_MESSENGER_INPUT:
            state.messengerInputField = action.newText;
            return state;

        default:
            return state;
    }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE});

export const updateMessengerInputCreator = (text) => ({type: UPDATE_MESSENGER_INPUT, newText: text});

export default dialogsReducer;