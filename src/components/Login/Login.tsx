import React from 'react'
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import { AuthInitialStateType, signInData } from '../../redux/authReducer';
//import classes from './Login.module.css';

type PropsType = {
    auth: AuthInitialStateType

    signIn: (formData: signInData) => void
}

const Login = (props: PropsType) => {
    let submit = (formData: any) => {
        props.signIn(formData);
    }
    return <>
        {!props.auth.isAuth &&
        
            <div>
                <h1>Please sign in:</h1>
                <LoginForm onSubmit={submit} captchaUrl={props.auth.captchaUrl}/>
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
