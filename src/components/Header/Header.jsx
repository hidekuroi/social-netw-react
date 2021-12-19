import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header = (props) => {
    return(
        <header className={classes.header}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png' />
            <NavLink to="/profile" onClick={() => {props.getProfile(21334)}} className={classes.auth}>{props.authData.login ? props.authData.login : <NavLink to="/login">Login</NavLink>}</NavLink>
        </header>
    );
}

export default Header;