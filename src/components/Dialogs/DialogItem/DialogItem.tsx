import React from 'react';
import classes from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

type PropsType = {
    id: number,
    name: string
}

const DialogItem = (props: PropsType) =>{
    return(
        <div className={classes.dialog}>
            <NavLink to={'/messages/' + props.id} activeClassName={classes.active}>{props.name}</NavLink>
        </div>
    );
}


export default DialogItem;