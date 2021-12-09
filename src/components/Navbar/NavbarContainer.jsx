import React from 'react';
// import StoreContext from '../../StoreContext';
import { connect } from 'react-redux';
import Navbar from './Navbar';

// const NavbarContainer = (props) => {

  
//     return <StoreContext.Consumer>
//       { store => {
//         let dialogsData = store.getState().messenger.dialogsData;
      
//         return <Navbar dialogsData={ dialogsData }/>
//       }
//       }

//     </StoreContext.Consumer>
    
// }

let mapStateToProps = (state) => {
  return {
    dialogsData: state.messenger.dialogsData
  }
}

let mapDispatchToProps = (dispatch) => {
  return 0;
}

const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarContainer;

 // 