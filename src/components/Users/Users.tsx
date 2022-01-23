import React from "react";
import Paginator from "./Paginator";
import classes from './Users.module.css';
import User from "./User/User";
import { FilterType, UserType } from './../../types/types'
import UsersSearchFilterForm from "./UsersSearchFilterForm";

export type UsersPropsType = {
    users: Array<UserType>
    followingProgress: Array<number>
    isAuth: boolean
    profilePic: string
    totalUsersCount: number
    pageSize: number
    currentPage: number
    filter: FilterType

    followUser: (id: number) => void
    unfollowUser: (id: number) => void
    onPageChange: (page: number) => void
    onFilterSet: (filter: FilterType) => void
}

const Users = (props: UsersPropsType) => {  
    return (
    <div>
        <div>
            <UsersSearchFilterForm filter={props.filter} onFilterSet={props.onFilterSet}/>
        </div>
        <Paginator {...props}/>
        <div>{
            props.users.map(u => <div key={u.id}>
                <User user={u} profilePic={props.profilePic} isAuth={props.isAuth}
                 followingProgress={props.followingProgress} followUser={props.followUser}
                  unfollowUser={props.unfollowUser}/>
            </div>
            )
        }</div>
    </div>
    );
}

export default Users;