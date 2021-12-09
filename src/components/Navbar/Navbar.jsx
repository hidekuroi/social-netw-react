import React from 'react';
import classes from './Navbar.module.css';
import RecentDialogs from './RecentDialogs/RecentDialogs';
import Menu from './Menu/Menu';
import {BrowserRouter, Route} from 'react-router-dom';

const Navbar = (props) => {
    return(
      <div>
        <Menu />
        <Route path='/profile' render={ () => <RecentDialogs dialogsData={props}/> } />
        <Route path='/feed' render={ () => <RecentDialogs dialogsData={props}/> } />
        <Route path='/settings' render={ () => <RecentDialogs dialogsData={props}/> } />
        <Route path='/music' render={ () => <RecentDialogs dialogsData={props}/> } />
      </div>
    );
    
}

export default Navbar;