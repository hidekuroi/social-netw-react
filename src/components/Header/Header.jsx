import React from 'react';
import classes from './Header.module.css';

const Header = () => {
    return(
        <header className={classes.header}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png' />
        </header>
    );
}

export default Header;