import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserPage, changePhotoSize, getProfile, getStatus, updateStatus } from '../../redux/profileReducer';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        this.props.getStatus(userId);
        this.props.getProfile(userId);
    }

    render() {
        return (
            <Profile {...this.props}/>
        )
    }
}


let mapStateToProps = (state) => ({
    userPage: state.profile.userPage,
    userPhoto: state.profile.userPhoto,
    status: state.profile.status
});


export default compose(
    connect(mapStateToProps,{setUserPage, changePhotoSize, getProfile, getStatus, updateStatus}),
    withRouter,
)(ProfileContainer);


