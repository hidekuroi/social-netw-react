import React from 'react';
import Message from './Message/Message';
import classes from './Dialogs.module.css';
import { NavLink } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import { sendMessageCreator, updateMessengerInputCreator } from '../../redux/dialogsReducer';


const Dialogs = (props) => {

    let dialogsData = props.messengerData.dialogsData;

    let dialogsItems = dialogsData
    .map(el => (<DialogItem name={el.name} id={el.id} />));


    let messagesData = props.messengerData.messagesData;

    let messages = messagesData
    .map(el => (<Message text={el.message} id={el.id} />));

    const updateMessengerInput = (e) => {
        props.dispatch(updateMessengerInputCreator(e.target.value));
    };

    const sendMessage = () => {
        props.dispatch(sendMessageCreator());
    };

    return(
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogsItems}
            </div>
            <div className={classes.messenger}>
                <div className={classes.messages}>
                 {messages}
                </div>
                <div className={classes.messageInput}>
                    <textarea placeholder='Input your message'
                            value={props.messengerData.messengerInputField}
                            onChange={ updateMessengerInput }></textarea>
                    <button onClick={ sendMessage }>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;