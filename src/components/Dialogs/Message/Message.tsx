import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../redux/redux-store';
import { MessageType } from '../../../types/types';
import classes from './../Dialogs.module.css';

type PropsType = {
    message: MessageType,
    myPicture: string,
    myId: number,
    companionPicture: string,
    companionId: number,
    spot: string
}


const Message = (props: PropsType) => {
    let avatar = '';
    let isMyMessage = false;
    let link = '';

    if(props.message.senderId === props.myId) {
        avatar = props.myPicture;
        isMyMessage = true;
        link = `/profile/${props.myId}`
    }
    else if(props.message.senderId === props.companionId) {
        avatar = props.companionPicture;
        isMyMessage = false;
        link = `/profile/${props.companionId}`
    }

    return(
        <div className={`${isMyMessage ? classes.myMessage : classes.companionMessage} ${!props.message.viewed && classes.notViewed}`}>
            <Stack>
                <Avatar component={Link} src={avatar} to={link}/>
                <div className={`${classes.messageText}`}>{props.message.body}</div>
            </Stack>
        </div>
    );
}


export default Message;