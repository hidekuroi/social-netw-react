import React from 'react';
import { sendMessageCreator, updateMessengerInputCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';


const DialogsContainer = (props) => {

    let messengerData = props.store.getState().messenger;

    const updateMessengerInput = (text) => {
        props.store.dispatch(updateMessengerInputCreator(text));
    };

    const sendMessage = () => {
        props.store.dispatch(sendMessageCreator());
    };

    return(
        <Dialogs messengerData={ messengerData }
                 updateMessengerInput={ updateMessengerInput }
                 sendMessage={ sendMessage }/>
    );
}

export default DialogsContainer;