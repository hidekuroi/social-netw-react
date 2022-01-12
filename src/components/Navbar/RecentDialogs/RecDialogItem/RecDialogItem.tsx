import React from 'react';
import classes from './RecDialogItem.module.css';
import { NavLink } from 'react-router-dom';

type PropsType = {
    id: number,
    name: string
}

const RecDialogItem = (props: PropsType) => {
    return(
        <div className={classes.item}>
            <NavLink to={'/messages/' + props.id}>{props.name}</NavLink>
        </div>
    );
}

export default RecDialogItem;