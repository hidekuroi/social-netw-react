import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Menu.module.css';

const Menu = () => {
    return(
        <nav className={classes.nav}>
          <div className={classes.menu}>
            <div className={classes.item}>
              <NavLink to="/profile" activeClassName={classes.activeLink}>Profile</NavLink>
            </div>
            <div className={classes.item}>
              <NavLink to="/messages" activeClassName={classes.activeLink}>Messages</NavLink>
            </div>
            <div className={classes.item}>
              <NavLink to="/feed" activeClassName={classes.activeLink}>Feed</NavLink>
            </div>
            <div className={classes.item}>
              <NavLink to='/music' activeClassName={classes.activeLink}>Music</NavLink>
            </div>
            <div className={classes.item}>
              <NavLink to='settings' activeClassName={classes.activeLink}>Settings</NavLink>
            </div>
          </div>
        </nav>
    );
}

export default Menu;