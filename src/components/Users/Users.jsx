import React from "react";
import classes from './Users.module.css'

const Users = (props) => {
    return <div>{

        props.users.map(u => <div key={u.id}>
            <div>
                <div>
                    <img src={u.profilePicture} className={classes.profilePicture}/>
                </div>
                <div>
                    {
                        u.isFollowed
                         ? <button onClick={() => {
                             props.toggleFollow(u.id)
                            }}>Unfollow</button>
                         : <button onClick={() => {
                             props.toggleFollow(u.id)
                            }}>Follow</button>
                    }
                </div>
            </div>
            <div>
                <div>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </div>
                <div>
                    <div>{u.location.country}</div>
                    <div>{u.location.city}</div>
                </div>
            </div>
        </div>
        )
    }</div>
}

export default Users;