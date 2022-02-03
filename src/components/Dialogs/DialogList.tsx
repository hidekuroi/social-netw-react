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
    .map(el => (<DialogItem name={el.userName} id={el.id} />));



    return <div>
    <div className={classes.dialogItems}>
        {dialogsItems}
    </div>
  </div>;
};

export default DialogList;
