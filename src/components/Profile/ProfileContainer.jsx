import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserPage, changePhotoSize, getProfile } from '../../redux/profileReducer';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';

class ProfileContainer extends Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
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
    userPhoto: state.profile.userPhoto
});


export default connect(mapStateToProps,{setUserPage, changePhotoSize, getProfile})(withRouter(ProfileContainer));
