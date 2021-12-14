import React from 'react';
import Users from "./Users";
import { changeCurrentPageAC, setUsersAC, setUsersCountAC, toggleFollowAC} from '../../redux/usersReducer';
import { connect } from 'react-redux';

let profilePic = 'https://wiki-vk.ru/s/001/512/41.png';



let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    totalUsersCount: state.usersPage.totalUsersCount,
    profilePic: profilePic
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    toggleFollow: (userId) => {
      dispatch(toggleFollowAC(userId));
    },
    setUsers: (users) => {
        dispatch(setUsersAC(users));
    },
    setUsersCount: (count) => {
        dispatch(setUsersCountAC(count));
    },
    changeCurrentPage: (page) => {
        dispatch(changeCurrentPageAC(page));
    }
  }
}


const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);


export default UsersContainer;