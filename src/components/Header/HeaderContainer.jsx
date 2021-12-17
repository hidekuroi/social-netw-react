import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';
import Header from './Header';
import { setAuthUser } from '../../redux/authReducer';

class HeaderContainer extends Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
        .then(response => {
            this.props.setAuthUser(response.data.data);
            
        });
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

export default connect(mapStateToProps, {setAuthUser})(HeaderContainer);
