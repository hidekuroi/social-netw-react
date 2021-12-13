import React from 'react';
import classes from './Navbar.module.css';
import RecentDialogs from './RecentDialogs/RecentDialogs';
import Menu from './Menu/Menu';
import {Route} from 'react-router-dom';

const Navbar = (props) => {

  let recentDialogs = () => {
    return(
      <RecentDialogs recentDialogs={props.dialogsData} />
    );
  }
    return(
      <div>
        <Menu />
        <Route path='/profile' render={recentDialogs} />
        <Route path='/feed' render={recentDialogs} />
        <Route path='/settings' render={recentDialogs} />
        <Route path='/users' render={recentDialogs} />
        <Route path='/music' render={recentDialogs } />
      </div>
    );
    
}

export default Navbar;