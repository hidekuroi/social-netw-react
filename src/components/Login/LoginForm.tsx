import React from 'react';
import { required, email } from '../utils/validators';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { CheckboxInput, Input, EmailInput, PasswordInput } from '../common/FormControls';
import Button from '@mui/material/Button';
import classes from './Login.module.css';

type PropsType = {
    captchaUrl: string | null,
    
}

const Form: React.FC<InjectedFormProps<{}, PropsType, string> & PropsType> = (props) => {
    return (
        
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field component={EmailInput} validate={[email]} type="text" label="Email" name="email"></Field>
                </div>
                <div>
                    <Field component={PasswordInput} validate={[required]} type="password" label="Password" name="password"></Field>
                </div>
                <div>
                    <Field component={CheckboxInput} type="checkbox" label="Remember Me" name="rememberMe" />
                </div>
                {props.captchaUrl && <img alt="captcha" className={classes.captchaImg} src={props.captchaUrl}/>}
                {props.captchaUrl && <Field component={Input} validate={[required]} type="text" name="captcha"></Field>}
                <div>
                    <Button variant='contained' type="submit">Sign in</Button>
                </div>
                { props.error && <div className={classes.errorBox}>
                        {props.error}
                  </div>
                }
            </div>
        </form>
    );
}

const LoginForm = reduxForm<{}, PropsType>({
    form: 'login'
})(Form);


export default LoginForm;