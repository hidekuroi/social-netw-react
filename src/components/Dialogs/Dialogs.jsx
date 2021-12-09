import React from 'react';
import Message from './Message/Message';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';


const Dialogs = (props) => {

    let dialogsData = props.messengerData.dialogsData;

    let dialogsItems = dialogsData
    .map(el => (<DialogItem name={el.name} id={el.id} />));


    let messagesData = props.messengerData.messagesData;

    let messages = messagesData
    .map(el => (<Message text={el.message} id={el.id} />));

    const onInputFieldChange = (e) => {
        let text = e.target.value;
        props.updateMessengerInput(text);
    };

    const onSendMessage = () => {
        props.sendMessage();
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
                            onChange={ onInputFieldChange }></textarea>
                    <button onClick={ onSendMessage }>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;