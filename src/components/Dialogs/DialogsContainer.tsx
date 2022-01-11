import React from 'react';
import { sendMessage } from '../../redux/dialogsReducer';
import { connect, ConnectedProps } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import Dialogs from './Dialogs';
import { compose } from 'redux';
import { reset } from 'redux-form';
import { RootState } from '../../redux/redux-store';

type PropsType = ConnectedProps<typeof container>


let mapStateToProps = (state: RootState) => {
    return {
        messengerData: state.messenger,
        inputFieldData: state.form.messenger
    }
}

let container = connect(mapStateToProps, { sendMessage, reset })



export default compose(
    container,
    withAuthRedirect
)(Dialogs);

