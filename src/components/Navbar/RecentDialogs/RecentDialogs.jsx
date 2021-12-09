import React from 'react';
import classes from './RecentDialogs.module.css';
import RecDialogItem from './RecDialogItem/RecDialogItem';


const RecentDialogs = (props) =>{
    
    let dialogsData = props.dialogsData.dialogsData;


    let recentDialogItems = dialogsData
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