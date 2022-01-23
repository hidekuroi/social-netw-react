import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import React from 'react'


export let Input = ({input, meta, ...props}: any) => {

    
    let hasError = meta.touched && meta.error;
    return (
        <div>
            <TextField sx={{marginBottom: '10px', marginTop: '7px'}}
        error={hasError}
          label={props.label}
          type="text"
          autoComplete='off'
        helperText={hasError && meta.error}
          {...input}
          {...props}
        />
        </div>
        
    )
}

export let EmailInput = ({input, meta, ...props}: any) => {

    
    let hasError = meta.touched && meta.error;
    return (
        <div>
            <TextField sx={{marginBottom: '10px', marginTop: '7px'}}
          error={hasError}
          id="email-input"
          label={props.label}
          type="email"
          autoComplete="current-email"
          helperText={hasError && meta.error}
          {...input}
          {...props}
        />
        </div>
        
    )
}

export let PasswordInput = ({input, meta, ...props}: any) => {
    let hasError = meta.touched && meta.error;
    return(
        <div>
            <TextField sx={{marginBottom: '5px'}}
          error={hasError}
          id="password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          helperText={hasError && meta.error}
          {...input}
          {...props}
        />
        </div>
    );
}

export let FilterInput = ({input, meta, ...props}: any) => {

    return (
        <div>
            <TextField sx={{marginBottom: '10px', marginTop: '7px'}}
          label={props.label}
          type="text"
          autoComplete='off'
          {...input}
          {...props}
        />
        </div>
        
    )
}

export let CheckboxInput = ({input, meta, ...props}: any) => {
    return(
        <div>
            <FormControlLabel control={<Checkbox />} {...props} {...input} label={props.label} />
        </div>
    );
}

