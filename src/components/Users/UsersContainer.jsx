import React from 'react';
import Users from "./Users";
import { setUsersAC, toggleFollowAC} from '../../redux/usersReducer';
import { connect } from 'react-redux';



let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    toggleFollow: (userId) => {
      dispatch(toggleFollowAC(userId));
    },
    setUsers: (users) => {
        dispatch(setUsersAC(users));
    }
  }
}


const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);


export default UsersContainer;