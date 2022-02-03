import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/redux-store';
import Navbar from './Navbar';


let mapStateToProps = (state: RootState) => {
  return {
    auth: state.auth,
  }
}

const NavbarContainer = connect(mapStateToProps)(Navbar);

export default NavbarContainer;
