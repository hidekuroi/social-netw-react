import React from 'react';
import StoreContext from '../../StoreContext';
import Navbar from './Navbar';

const NavbarContainer = (props) => {

  
    return <StoreContext.Consumer>
      { store => {
        let dialogsData = store.getState().messenger.dialogsData;
      
        return <Navbar dialogsData={ dialogsData }/>
      }
      }

    </StoreContext.Consumer>
    
}

export default NavbarContainer;

 // 