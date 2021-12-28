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
                <User user={u} {...props}/>
            </div>
            )
        }</div>
    </div>
    );
}

export default Users;