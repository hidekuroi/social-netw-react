import React from 'react';
import Message from './Message/Message';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import { Field, reduxForm } from 'redux-form';

const MessengerInputForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field  component="textarea" type="text" placeholder="Input your message here" name="messengerInput"></Field>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    );
}

const MessengerInputReduxForm = reduxForm({
    form: 'messenger'
})(MessengerInputForm);

const Dialogs = (props) => {

    let dialogsData = props.messengerData.dialogsData;

    let dialogsItems = dialogsData
    .map(el => (<DialogItem name={el.name} id={el.id} />));


    let messagesData = props.messengerData.messagesData;

    let messages = messagesData
    .map(el => (<Message text={el.message} id={el.id} />));

    const onSendMessage = (formData) => {
        props.sendMessage(formData);
        props.reset('messenger');
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
                    <MessengerInputReduxForm onSubmit={onSendMessage}/>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;