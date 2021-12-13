import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';


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