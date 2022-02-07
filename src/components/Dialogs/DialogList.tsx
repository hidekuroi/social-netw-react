import { List } from '@mui/material';
import React from 'react';
import { DialogItemType } from '../../redux/dialogsReducer';
import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';

type PropsType = {
    dialogsData: Array<DialogItemType>
}

const DialogList = (props: PropsType) => {

    let dialogsData = props.dialogsData;

    let dialogsItems = dialogsData
    .map(el => (<DialogItem name={el.userName} id={el.id} photo={el.photos.small}
        hasNewMessages={el.hasNewMessages} newMessagesCount={el.newMessagesCount} />));



    return <div>
    <div>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        
        {dialogsItems}
        </List>
    </div>
  </div>;
};

export default DialogList;
