import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { changeTheme } from '../../redux/appReducer';
import { RootState } from '../../redux/redux-store';
import classes from './Settings.module.css';

type PropsType = {
    darkTheme: boolean,

    changeTheme: () => void
}

const Settings = (props: PropsType) => {

        return(
        <div className={classes.wrapper}>
            Settings
            <button onClick={() => {
                props.changeTheme();
                }}>Dark theme</button>
        </div>
        );
}

let mapStateToProps = (state: RootState) => ({
    darkTheme: state.app.darkTheme
});



export default compose(
    connect(mapStateToProps, {changeTheme}),
    withAuthRedirect
)(Settings);