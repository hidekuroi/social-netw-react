import React from 'react';
import classes from './Header.module.css';

const Header = (props) => {

    return(
        <header className={classes.header}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png' />
            <div className={classes.auth}>{props.authData.login}</div>
        </header>
    );
}

export default Header;