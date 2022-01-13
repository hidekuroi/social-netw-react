import React from 'react'
import classes from './FormControls.module.css';



export let Input = ({input, meta, ...props}: any) => {

    
    let hasError = meta.touched && meta.error;
    return (
        <div>
            <div className={hasError && classes.errorField}>
                <input {...input} {...props} />
            </div>
            <div className={hasError && classes.errorMessage}>
                {hasError && meta.error}
            </div>
        </div>
        
    )
}

