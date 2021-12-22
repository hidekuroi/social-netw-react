import React from 'react';
import { sendMessage } from '../../redux/dialogsReducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import Dialogs from './Dialogs';
import { compose } from 'redux';
import { reset } from 'redux-form';


let mapStateToProps = (state) => {
    return {
        messengerData: state.messenger,
        inputFieldData: state.form.messenger
    }
}

export default compose(
    connect(mapStateToProps, { sendMessage, reset }),
    withAuthRedirect
)(Dialogs);

