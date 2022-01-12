import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { signIn } from '../../redux/authReducer';
import { RootState } from '../../redux/redux-store';
import Login from './Login';


let mapStateToProps = (state: RootState) => ({
    auth: state.auth
})


export default compose(
    connect(mapStateToProps, {signIn})
)(Login)
