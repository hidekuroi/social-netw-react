import React from 'react';
import classes from './Navbar.module.css';
import RecentDialogs from './RecentDialogs/RecentDialogs';
import Menu from './Menu/Menu';
import {Route} from 'react-router-dom';

const Navbar = (props) => {

    return(
      <div>
        <Menu />
        <Route path='/profile' render={ () => <RecentDialogs recentDialogs={props.dialogsData}/> } />
        <Route path='/feed' render={ () => <RecentDialogs recentDialogs={props.dialogsData}/> } />
        <Route path='/settings' render={ () => <RecentDialogs recentDialogs={props.dialogsData}/> } />
        <Route path='/music' render={ () => <RecentDialogs recentDialogs={props.dialogsData}/> } />
      </div>
    );
    
}

export default Navbar;