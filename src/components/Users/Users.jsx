import React from "react";
import Paginator from "./Paginator";
import classes from './Users.module.css';
import User from "./User/User";

const Users = (props) => {  
    return (
    <div>
        <Paginator {...props}/>
        <div>{
            props.users.map(u => <div key={u.id}>
                <User user={u} followUser={props.followUser} unfollowUser={props.unfollowUser}
                 followingProgress={props.followingProgress} profilePic={props.profilePic}
                 isAuth={props.isAuth}/>
            </div>
            )
        }</div>
    </div>
    );
}

export default Users;