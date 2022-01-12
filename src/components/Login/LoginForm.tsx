import React from 'react';
import { required, email } from '../utils/validators';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Input } from '../common/FormControls';
import classes from './Login.module.css';

type PropsType = {
    captchaUrl: string | null,
    
}

const Form: React.FC<InjectedFormProps<{}, PropsType, string> & PropsType> = (props) => {
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
                {props.captchaUrl && <img alt="captcha" className={classes.captchaImg} src={props.captchaUrl}/>}
                {props.captchaUrl && <Field component={Input} validate={[required]} type="text" name="captcha"></Field>}
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

const LoginForm = reduxForm<{}, PropsType>({
    form: 'login'
})(Form);


export default LoginForm;