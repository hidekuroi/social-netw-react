import React from "react";
import Paginator from "./Paginator";
import classes from './Users.module.css';
import User from "./User/User";
import { FilterType } from './../../types/types'
import UsersSearchFilterForm from "./UsersSearchFilterForm";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFollowingProgress, getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selector";
import { RootState } from "../../redux/redux-store";
import { followUser as followUsr } from "../../redux/usersReducer";
import { unfollowUser as unfollowUsr } from "../../redux/usersReducer";

export type UsersPropsType = {
    filter: FilterType

    onPageChange: (page: number) => void
    onFilterSet: (filter: FilterType) => void
}


const Users = (props: UsersPropsType) => {  

    let profilePic = 'https://wiki-vk.ru/s/001/512/41.png';

    const users = useSelector(getUsers)
    const followingProgress = useSelector(getFollowingProgress)
    const isAuth = useSelector((state: RootState)=>{ return state.auth.isAuth})
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)

    const dispatch = useDispatch();

    const followUser = (userId: number) => {
        dispatch(followUsr(userId))
    }

    const unfollowUser = (userId:number) => {
        dispatch(unfollowUsr(userId))
    }
 


    return (
    <div>
        <div>
            <UsersSearchFilterForm filter={props.filter} onFilterSet={props.onFilterSet}/>
        </div>
        <Paginator {...props} totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}/>
        <div>{
            users.map(u => <div key={u.id}>
                <User user={u} profilePic={profilePic} isAuth={isAuth}
                 followingProgress={followingProgress} followUser={followUser}
                  unfollowUser={unfollowUser}/>
            </div>
            )
        }</div>
    </div>
    );
}

export default Users;