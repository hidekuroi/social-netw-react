import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { authCheck, signOut, AuthInitialStateType } from '../../redux/authReducer';
import { actions } from '../../redux/authReducer';
import { getProfile } from '../../redux/profileReducer';
import { RootState } from '../../redux/redux-store';

const setAuthUser = actions.setAuthUser

type PropsType = {
    authData: AuthInitialStateType,
    avatar: any,
    isAuth: boolean,

    getProfile: (id: number) => void,
    authCheck: () => void,
    signOut: () => void
}

const HeaderContainer = (props: PropsType) => {

    useEffect(() => {
        props.authCheck();
    }, [props.authData.isAuth])
    

    return (
        <Header {...props} />
    )
}

let mapStateToProps = (state: RootState) => ({
    authData: state.auth,
    avatar: state.auth.signedInUserPage.photos.small,
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { getProfile, authCheck, signOut})(HeaderContainer);
