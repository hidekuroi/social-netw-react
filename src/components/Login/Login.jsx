import React from 'react'
import { Field, reduxForm } from 'redux-form';

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component="input" type="text" placeholder="Email" name="email"></Field>
                </div>
                <div>
                    <Field component="input" type="password" placeholder="Password" name="password"></Field>
                </div>
                <div>
                    <Field component="input" type="checkbox" name="rememberMe" />Remember Me
                </div>
                <div>
                    <button type="submit">Sign in</button>
                </div>
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
                Log out
            </div>
        }
        </>
    
}

export default Login;
