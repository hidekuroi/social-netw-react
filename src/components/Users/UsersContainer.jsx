import React from 'react';
import Users from "./Users";
import { changeCurrentPage, toggleFollow, toggleLoading, addFollowingUser, getUsers, followUser, unfollowUser} from '../../redux/usersReducer';
import Loading from '../common/Loading';
import { connect } from 'react-redux';
import { compose } from 'redux';

let profilePic = 'https://wiki-vk.ru/s/001/512/41.png';

class UsersContainer extends React.Component {
    
  componentDidMount() {
    this.props.getUsers(this.props.pageSize);
  }

  componentWillUnmount() {
    this.props.changeCurrentPage(1);
  }

  onPageChange = (page) => {
      this.props.changeCurrentPage(page);
      this.props.getUsers(this.props.pageSize, page);
  }

  render() {
    return <>
            {this.props.isLoading ? <Loading color={'white'}/> : null}
           <Users users={this.props.users}
                  currentPage={this.props.currentPage}
                  changeCurrentPage={this.props.changeCurrentPage}
                  onPageChange={this.onPageChange}
                  totalUsersCount={this.props.totalUsersCount}
                  pageSize={this.props.pageSize}
                  profilePic={profilePic}
                  followingProgress={this.props.followingProgress}
                  followUser={this.props.followUser}
                  unfollowUser={this.props.unfollowUser} />
          </>
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    totalUsersCount: state.usersPage.totalUsersCount,
    profilePic: profilePic,
    isLoading: state.usersPage.isLoading,
    followingProgress: state.usersPage.followingProgress
  }
}

export default compose(
  connect(mapStateToProps, { changeCurrentPage, toggleLoading, getUsers, followUser, unfollowUser })
)(UsersContainer);



