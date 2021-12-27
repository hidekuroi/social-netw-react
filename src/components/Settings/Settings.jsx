import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { changeTheme } from '../../redux/appReducer';
import classes from './Settings.module.css';

class Settings extends React.Component  {
    

    render(){
        return(
        <div className={classes.wrapper}>
            Settings
            <button onClick={() => {
                this.props.changeTheme();
                }}>Dark theme</button>
        </div>
        );
    }
}

let mapStateToProps = (state) => ({
    darkTheme: state.app.darkTheme
});



export default compose(
    connect(mapStateToProps, {changeTheme}),
    withAuthRedirect
)(Settings);