import React from 'react'
import { NavLink } from 'react-router-dom';
import classes from './User.module.css';

const User = (props) => {
    let profilePic = props.profilePic;
    let u = props.user
    return (
        <div>
            <div>
                <div>
                    <NavLink to={`profile/${u.id}`} className={classes.profpic}>
                        <img src={u.photos.small ? u.photos.small : profilePic} className={classes.profilePicture} />
                    </NavLink>
                </div>
                <div>
                    {
                        u.followed
                            ? <button disabled={props.followingProgress.some(id => id === u.id)} onClick={() => {
                                props.unfollowUser(u.id);

                            }}>Unfollow</button>
                            : <button disabled={props.followingProgress.some(id => id === u.id)} onClick={() => {

                                props.followUser(u.id);
                            }}>Follow</button>
                    }
                </div>
            </div>
            <div>
                <div>
                    <div className={classes.username}>{u.name}</div>
                    <div>{u.status}</div>
                </div>
                <div>
                    <div>country</div>
                    <div>city</div>
                </div>
            </div>
        </div>
    )
}

export default User