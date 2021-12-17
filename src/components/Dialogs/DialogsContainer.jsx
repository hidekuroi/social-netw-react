import React from 'react';
import { sendMessage, updateMessengerInput } from '../../redux/dialogsReducer';
import { connect } from 'react-redux';
import Dialogs from './Dialogs';


let mapStateToProps = (state) => {
    return {
        messengerData: state.messenger
    }
}

const DialogsContainer = connect(mapStateToProps, { updateMessengerInput, sendMessage })(Dialogs);
export default DialogsContainer;