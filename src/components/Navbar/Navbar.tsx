import React from 'react';
import classes from './Navbar.module.css';
import RecentDialogs from './RecentDialogs/RecentDialogs';
import Menu from './Menu/Menu';
import {Route} from 'react-router-dom';
import { AuthInitialStateType } from '../../redux/authReducer';
import { DialogType } from '../../redux/dialogsReducer';

type PropsType = {
  auth: AuthInitialStateType,
  dialogsData: Array<DialogType>
}

const Navbar = (props: PropsType) => {

  let recentDialogs = () => {
    return(
      <RecentDialogs recentDialogs={props.dialogsData} />
    );
  }
  if(props.auth.isAuth){
    return(
      <div>
        <Menu isAuth={props.auth.isAuth} />
        {/* <Route path='/profile' render={recentDialogs} />
        <Route path='/feed' render={recentDialogs} />
        <Route path='/settings' render={recentDialogs} />
        <Route path='/users' render={recentDialogs} />
        <Route path='/music' render={recentDialogs } /> */}
      </div>
    );
  }
  return(
    <div><Menu isAuth={props.auth.isAuth}/></div>
  );
}

export default Navbar;