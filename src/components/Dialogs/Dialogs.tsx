import React, { useEffect } from 'react';
import classes from './Dialogs.module.css';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { DialogsInitialStateType, getDialogs, getUnreadMessagesCount, sendMessageAPI } from '../../redux/dialogsReducer';
import { Input } from '../common/FormControls';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { actions } from '../../redux/dialogsReducer';
import { useDispatch, useSelector } from 'react-redux';
import DialogList from './DialogList';
import CurrentDialog from './CurrentDialog';
import { RootState } from '../../redux/redux-store';


type PropsType = {
    messengerData: DialogsInitialStateType,

    reset: (field: string) => void
};

const MessengerInputForm: React.FC<InjectedFormProps<{}, {}, string>> = (props) => {

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
    const companionId = useSelector((state: RootState) => {return state.messenger.companionId})

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDialogs())
    }, []);

    useEffect(() => {
        dispatch(getUnreadMessagesCount())
        console.log(`NEW MESSAGES: ${props.messengerData.newMessagesCount}`)
    },[props.messengerData.newMessagesCount])
    

    

    const onSendMessage = (formData: any) => {
        dispatch(sendMessageAPI(companionId, formData.messengerInput));
        props.reset('messenger');
    };

    return(
        <div className={classes.dialogs}>
            <DialogList dialogsData={props.messengerData.dialogsData} />
            <div className={classes.messenger}>
                <CurrentDialog />
                
                <div className={classes.messageInput}>
                    <MessengerInputReduxForm onSubmit={onSendMessage}/>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;