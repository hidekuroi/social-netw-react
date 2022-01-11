import React from 'react';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import classes from './Music.module.css';

const Music = () => {
    return(
        <div>
            <div className={classes.music}>
                <ul>
                    <li>Циркониевый браслет - 8</li>
                    <li>Циркониевый браслет - Лоу-Фай</li>
                    <li>Увула - лузер</li>
                </ul>
            </div>
        </div>
    );
}

export default withAuthRedirect(Music);