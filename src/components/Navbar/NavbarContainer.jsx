import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';


let mapStateToProps = (state) => {
  return {
    dialogsData: state.messenger.dialogsData,
    auth: state.auth
  }
}

const NavbarContainer = connect(mapStateToProps)(Navbar);

export default NavbarContainer;
