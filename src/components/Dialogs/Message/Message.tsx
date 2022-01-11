import React from 'react';
import classes from './../Dialogs.module.css';

type PropsType = {
    id: number
    text: string
}


const Message = (props: PropsType) => {
    return(
        <div className={`${classes.message}`}>{props.text}</div>
    );
}


export default Message;