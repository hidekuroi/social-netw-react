import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setUserPage, changePhotoSize, getProfile, getStatus, updateStatus, uploadPhoto, uploadInfo } from '../../redux/profileReducer';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

const ProfileContainer = (props) => {

    useEffect(() => {
        let userId = props.match.params.userId;
        if(!userId){
            userId = props.auth.id;
            if(!userId){
                props.history.push('/login');
            }
        }
        props.getStatus(userId);
        props.getProfile(userId);
    }, [props.auth, props.match.params.userId]);

        return (
            <Profile {...props}/>
        );
    }


let mapStateToProps = (state) => ({
    userPage: state.profile.userPage,
    userPhoto: state.profile.userPhoto,
    status: state.profile.status,
    auth: state.auth
});


export default compose(
    connect(mapStateToProps,{setUserPage, changePhotoSize, getProfile,
                             getStatus, updateStatus, uploadPhoto, uploadInfo}),
    withRouter,
)(ProfileContainer);


