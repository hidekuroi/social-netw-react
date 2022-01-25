import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, getStatus } from '../../redux/profileReducer';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { RootState } from '../../redux/redux-store';

//FIX LATER; MATCH AND HISTORY TYPES

type ProfilePropsType = {
    match: any,
    history: any
}

const ProfileContainer = (props: ProfilePropsType) => {
    
    const auth = useSelector((state: RootState) => {return state.auth})

    const dispatch = useDispatch();

    useEffect(() => {
        let userId = props.match.params.userId;
        if(!userId){
            userId = auth.id;
            if(!userId){
                props.history.push('/login');
            }
            dispatch(getStatus(userId));
            dispatch(getProfile(userId));
        }else{
        dispatch(getStatus(userId));
        dispatch(getProfile(userId));
        }
    }, [auth, props.match.params.userId]);

        return (
            <Profile {...props} auth={auth}/>
        );
    }


export default compose(
    withRouter,
)(ProfileContainer);



