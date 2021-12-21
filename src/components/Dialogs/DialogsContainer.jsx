import React from 'react';
import { sendMessage, updateMessengerInput } from '../../redux/dialogsReducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import Dialogs from './Dialogs';
import { compose } from 'redux';


let mapStateToProps = (state) => {
    return {
        messengerData: state.messenger,
    }
}

export default compose(
    connect(mapStateToProps, { updateMessengerInput, sendMessage }),
    withAuthRedirect
)(Dialogs);

