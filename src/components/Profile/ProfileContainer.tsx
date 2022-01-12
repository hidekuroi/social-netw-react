import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { setUserPage, changePhotoSize, getProfile, getStatus, updateStatus, uploadPhoto, uploadInfo } from '../../redux/profileReducer';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { RootState } from '../../redux/redux-store';

//FIX LATER; MATCH AND HISTORY TYPES

export type PrPropsType = ConnectedProps<typeof container>

export interface ProfilePropsType extends PrPropsType {
    match: any,
    history: any
}


const ProfileContainer = (props: ProfilePropsType) => {

    useEffect(() => {
        let userId = props.match.params.userId;
        if(!userId){
            userId = props.auth.id;
            if(!userId){
                props.history.push('/login');
            }
            props.getStatus(userId);
            props.getProfile(userId);
        }else{
        props.getStatus(userId);
        props.getProfile(userId);
        }
    }, [props.auth, props.match.params.userId]);

        return (
            <Profile {...props}/>
        );
    }


let mapStateToProps = (state: RootState) => ({
    userPage: state.profile.userPage,
    userPhoto: state.profile.userPhoto,
    status: state.profile.status,
    auth: state.auth
});

let container = connect(mapStateToProps,{setUserPage, changePhotoSize, getProfile,
    getStatus, updateStatus, uploadPhoto, uploadInfo})


export default compose(
    container,
    withRouter,
)(ProfileContainer);


