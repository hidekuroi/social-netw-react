import React from 'react';
import Message from './Message/Message';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { DialogsInitialStateType } from '../../redux/dialogsReducer';
import { Input } from '../common/FormControls';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

type PropsType = {
    messengerData: DialogsInitialStateType,

    sendMessage: (input: string) => void,
    reset: (field: string) => void
};

const MessengerInputForm: React.FC<InjectedFormProps<{}, {}, string>> = (props) => {
    console.log(props)
    return(
        <form onSubmit={props.handleSubmit}>
            <Stack direction="row" spacing={2}>
            <div>
                <Field  component={Input} type="text" placeholder="Input your message here" name="messengerInput"></Field>
            </div>
            <div>
            <IconButton sx={{marginTop: '13px'}} color="primary" type="submit" aria-label="sendMessage">
                <SendIcon />
            </IconButton>
            </div>
            </Stack>
        </form>
    );
}

const MessengerInputReduxForm = reduxForm<{}, {}>({
    form: 'messenger'
})(MessengerInputForm);

const Dialogs = (props: PropsType) => {

    let dialogsData = props.messengerData.dialogsData;

    let dialogsItems = dialogsData
    .map(el => (<DialogItem name={el.name} id={el.id} />));


    let messagesData = props.messengerData.messagesData;

    let messages = messagesData
    .map(el => (<Message text={el.message} id={el.id} />));

    const onSendMessage = (formData: any) => {
        console.log(formData)
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