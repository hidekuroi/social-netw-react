import React, {useEffect} from 'react';
import Users from "./Users";
import { changeCurrentPage, toggleLoading, requestUsers, followUser, unfollowUser} from '../../redux/usersReducer';
import Loading from '../common/Loading';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getCurrentPage, getFollowingProgress, getIsLoading, getPageSize, getTotalUsersCount, getUsers } from '../../redux/users-selector';

let profilePic = 'https://wiki-vk.ru/s/001/512/41.png';

const UsersContainer = (props) => {
    
  useEffect(() => {
    props.requestUsers(props.pageSize);
    
    return () => {
      props.changeCurrentPage(1);
    }
  }, [])


  const onPageChange = (page) => {
      props.changeCurrentPage(page);
      props.requestUsers(props.pageSize, page);
  }

  
    return <>
            {props.isLoading ? <Loading color={'white'}/> : null}
           <Users users={props.users}
                  currentPage={props.currentPage}
                  changeCurrentPage={props.changeCurrentPage}
                  onPageChange={onPageChange}
                  totalUsersCount={props.totalUsersCount}
                  pageSize={props.pageSize}
                  profilePic={profilePic}
                  followingProgress={props.followingProgress}
                  followUser={props.followUser}
                  unfollowUser={props.unfollowUser} />
          </>
  
}

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    currentPage: getCurrentPage(state),
    totalUsersCount: getTotalUsersCount(state),
    profilePic: profilePic,
    isLoading: getIsLoading(state),
    followingProgress: getFollowingProgress(state)
  }
}

export default compose(
  React.memo,
  connect(mapStateToProps, { changeCurrentPage, toggleLoading, requestUsers, followUser, unfollowUser })
)(UsersContainer);



// componentDidMount() {
  //   this.props.requestUsers(this.props.pageSize);
  // }

  // componentWillUnmount() {
  //   this.props.changeCurrentPage(1);
  // }
