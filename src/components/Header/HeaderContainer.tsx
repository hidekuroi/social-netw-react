import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { setAuthUser, authCheck, signOut, AuthInitialStateType } from '../../redux/authReducer';
import { getProfile } from '../../redux/profileReducer';
import { RootState } from '../../redux/redux-store';

type PropsType = {
    authData: AuthInitialStateType,

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
});

export default connect(mapStateToProps, { getProfile, authCheck, signOut})(HeaderContainer);
