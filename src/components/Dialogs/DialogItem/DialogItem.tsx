import React from 'react';
import classes from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions } from '../../../redux/dialogsReducer';

const changeCompanionId = actions.changeCompanionId;

type PropsType = {
    id: number,
    name: string
}

const DialogItem = (props: PropsType) =>{
    const dispatch = useDispatch()

    const changeCurrentDialog = () => {
        dispatch(changeCompanionId(props.id))
    }

    return(
        <div className={classes.dialog}>
            <NavLink onClick={changeCurrentDialog} to={'/messages/' + props.id} activeClassName={classes.active}>{props.name}</NavLink>
        </div>
    );
}


export default DialogItem;