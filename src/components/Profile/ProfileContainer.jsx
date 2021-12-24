import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserPage, changePhotoSize, getProfile, getStatus, updateStatus } from '../../redux/profileReducer';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId){
            userId = this.props.auth.id;
            if(!userId){
                this.props.history.push('/login');
                console.log(this.props);
            }
        }
        this.props.getStatus(userId);
        this.props.getProfile(userId);
    }

    componentDidUpdate() {
        let userId = this.props.match.params.userId;
        if(!userId){
            userId = this.props.auth.id;
            if(!userId){
                this.props.history.push('/login');
                console.log(this.props);
            }
        }
        
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
    status: state.profile.status,
    auth: state.auth
});


export default compose(
    connect(mapStateToProps,{setUserPage, changePhotoSize, getProfile, getStatus, updateStatus}),
    withRouter,
)(ProfileContainer);


