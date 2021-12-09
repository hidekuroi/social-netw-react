import React from 'react';
import { sendMessageCreator, updateMessengerInputCreator } from '../../redux/dialogsReducer';
import StoreContext from '../../StoreContext';
import Dialogs from './Dialogs';


const DialogsContainer = (props) => {

    return <StoreContext.Consumer>
    { store => {
        let messengerData = store.getState().messenger;

        const updateMessengerInput = (text) => {
            store.dispatch(updateMessengerInputCreator(text));
        };
    
        const sendMessage = () => {
            store.dispatch(sendMessageCreator());
        };

        return <Dialogs messengerData={ messengerData }
                 updateMessengerInput={ updateMessengerInput }
                 sendMessage={ sendMessage }/>
       
        }
    }
    </StoreContext.Consumer>
}

export default DialogsContainer;