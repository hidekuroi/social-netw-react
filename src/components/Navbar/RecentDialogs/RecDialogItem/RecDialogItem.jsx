import React from 'react';
import classes from './RecDialogItem.module.css';
import { NavLink } from 'react-router-dom';

const RecDialogItem = (props) => {
    return(
        <div className={classes.item}>
            <NavLink to={'/messages/' + props.id}>{props.name}</NavLink>
        </div>
    );
}

export default RecDialogItem;