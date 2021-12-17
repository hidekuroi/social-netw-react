import React from 'react';
import Loader from 'react-loader-spinner';
import './Loading.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loading = () => {
    return (
        <div className='loader'>
            <Loader
                type="Oval"
                color="rgb(255, 255, 255)"
                height={100}
                width={100}
            />
        </div>
    )
}

export default Loading
