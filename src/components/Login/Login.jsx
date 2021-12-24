import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { required, email } from '../utils/validators';
import { Input } from '../common/FormControls';
import { Redirect } from 'react-router-dom';
import classes from './Login.module.css';

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={Input} validate={[email]} type="text" placeholder="Email" name="email"></Field>
                </div>
                <div>
                    <Field component={Input} validate={[required]} type="password" placeholder="Password" name="password"></Field>
                </div>
                <div>
                    <Field component="input" type="checkbox" name="rememberMe" />Remember Me
                </div>
                <div>
                    <button type="submit">Sign in</button>
                </div>
                { props.error && <div className={classes.errorBox}>
                        {props.error}
                  </div>
                }
        </form>
    );
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

const Login = (props) => {
    let submit = (formData) => {
        props.signIn(formData);
    }
    return <>
        {!props.auth.isAuth &&
        
            <div>
                <h1>Please sign in:</h1>
                <LoginReduxForm onSubmit={submit}/>
            </div>
        }
        {props.auth.isAuth &&
            <div>
                <Redirect to='/profile'></Redirect>
            </div>
        }
        </>
    
}

export default Login;
