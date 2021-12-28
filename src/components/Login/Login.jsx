import React from 'react'
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import classes from './Login.module.css';

const Login = (props) => {
    let submit = (formData) => {
        props.signIn(formData);
    }
    return <>
        {!props.auth.isAuth &&
        
            <div>
                <h1>Please sign in:</h1>
                <LoginForm onSubmit={submit}/>
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
