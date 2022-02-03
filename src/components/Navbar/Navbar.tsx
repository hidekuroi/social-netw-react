import React from 'react';
import classes from './Navbar.module.css';
import Menu from './Menu/Menu';
import { AuthInitialStateType } from '../../redux/authReducer';
import { DialogType } from '../../redux/dialogsReducer';

type PropsType = {
  auth: AuthInitialStateType,
  dialogsData: Array<DialogType>
}

const Navbar = (props: PropsType) => {
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