import React from 'react';
import Loader from 'react-loader-spinner';
import './Loading.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loading = (props) => {
    return (
        <div className='loader'>
            <Loader
                type="Oval"
                color={props.color}
                height={100}
                width={100}
            />
        </div>
    )
}

export default Loading
