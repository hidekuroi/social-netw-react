import React from 'react';
import classes from './RecentDialogs.module.css';
import RecDialogItem from './RecDialogItem/RecDialogItem';
import { DialogType } from '../../../redux/dialogsReducer';

type PropsType = {
  recentDialogs: Array<DialogType>
}

const RecentDialogs = (props: PropsType) =>{
    
    let dialogs = props.recentDialogs;

    let recentDialogItems = dialogs
    .map(el => (<RecDialogItem id={el.id} name={el.name}/>));

    return(
        <div className={classes.recentDialogs}>
          <div className={classes.header}>
            Recent Dialogs:
          </div>
          <div className={classes.items}>
            {recentDialogItems}
          </div>
        </div>
    );
}

export default RecentDialogs;