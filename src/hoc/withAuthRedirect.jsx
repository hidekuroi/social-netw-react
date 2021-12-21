import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if(this.props.isAuth){
                return <Component {...this.props} />
            }
            else return <Redirect to='/login'/>
        }
    }

    let ConnectedAuthRedirect = connect(mapStateToProps)(RedirectComponent);

    return ConnectedAuthRedirect;
}





