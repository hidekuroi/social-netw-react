import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../redux/redux-store';


let mapStateToProps = (state: RootState) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedirect = (Component: FC) => {
    const RedirectComponent = (props: any) => {
            if(props.isAuth){
                return <Component {...props} />
            }
            else return <Redirect to='/login'/>
    }

    let ConnectedAuthRedirect = connect(mapStateToProps)(RedirectComponent);

    return ConnectedAuthRedirect;
}





