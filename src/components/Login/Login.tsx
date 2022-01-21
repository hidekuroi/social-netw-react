import React from 'react'
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import { AuthInitialStateType, signInData } from '../../redux/authReducer';
import { Box } from '@mui/material';
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
        <Box sx={{ p: 2, mx: 'auto', m: 2 }}>
            <div>
                <h1>Please sign in:</h1>
                <Box
        sx={{
          mx: 'auto',
          width: 200,
          p: 1,
          m: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.50',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
                <LoginForm onSubmit={submit} captchaUrl={props.auth.captchaUrl}/>
        
      </Box>
            </div>
        </Box>
        }
        {props.auth.isAuth &&
            <div>
                <Redirect to='/profile'></Redirect>
            </div>
        }
        </>
    
}

export default Login;
