import React from 'react';
import { NavLink } from 'react-router-dom';
import { AuthInitialStateType } from '../../redux/authReducer';
import classes from './Header.module.css';
import Signout from './Signout';

type PropsType = {
    authData: AuthInitialStateType,

    signOut: () => void,
    getProfile: (id: number) => void
}

const Header = (props: PropsType) => {
    return(
        <header className={classes.header}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png' />
            <div className={classes.auth}>
            
                 {props.authData.login 
                 ? <Signout login={props.authData.login} signOut={props.signOut} getProfile={props.getProfile}/> 
                 : <NavLink to="/login">Sign In</NavLink>}

            </div>
        </header>
    );
}

export default Header;