import React from 'react';
import Navbar from './Navbar';

const NavbarContainer = (props) => {

  let dialogsData = props.store.getState().messenger.dialogsData;
  
    return(
      <Navbar dialogsData={ dialogsData }/>
    );
    
}

export default NavbarContainer;