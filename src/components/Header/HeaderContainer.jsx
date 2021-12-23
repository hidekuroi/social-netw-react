import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { setAuthUser, authCheck, signOut } from '../../redux/authReducer';
import { getProfile } from '../../redux/profileReducer';

class HeaderContainer extends Component {

    componentDidMount() {
        this.props.authCheck();
    }

    componentDidUpdate() {
        console.log('dixon');
        console.log(this.props);
    }

    render() {
        return (
            <Header {...this.props} />
        )
    }
}

let mapStateToProps = (state) => ({
    authData: state.auth,
});

export default connect(mapStateToProps, {setAuthUser, getProfile, authCheck, signOut})(HeaderContainer);
