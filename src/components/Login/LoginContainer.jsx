import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { signIn } from '../../redux/authReducer';
import Login from './Login';


let mapStateToProps = (state) => ({
    auth: state.auth
})


export default compose(
    connect(mapStateToProps, {signIn})
)(Login)
