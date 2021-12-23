import React from 'react';
import classes from './Signout.module.css';
import { NavLink } from 'react-router-dom';


let Signout = (props) => {
    
    return (
        <div>
            <div onClick={() => { props.signOut() }} className={classes.signout}>Sign Out</div>

            <NavLink to="/profile" onClick={() => {props.getProfile(21334)}} className={classes.login}>
                <div>{props.login}</div></NavLink>
        </div>
    )
}

export default Signout
