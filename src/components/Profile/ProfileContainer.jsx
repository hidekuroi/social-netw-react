import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';
import { setUserPage, changePhotoSize } from '../../redux/profileReducer';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';

class ProfileContainer extends Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) userId = 21334;
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        .then(response => {
            this.props.setUserPage(response.data);
            
        });
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


export default connect(mapStateToProps,{setUserPage, changePhotoSize})(withRouter(ProfileContainer));
