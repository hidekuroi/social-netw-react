import React from 'react';
import Users from "./Users";
import { changeCurrentPage, setUsers, setUsersCount, toggleFollow, toggleLoading} from '../../redux/usersReducer';
import Loading from '../common/Loading';
import { connect } from 'react-redux';
import * as axios from 'axios';

let profilePic = 'https://wiki-vk.ru/s/001/512/41.png';

class UsersContainer extends React.Component {
    
  componentDidMount() {
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}`)
      .then(response => {
          this.props.setUsers(response.data.items);
          this.props.setUsersCount(response.data.totalCount);
          this.props.toggleLoading();
      });
  }

  componentWillUnmount() {
    this.props.toggleLoading();
    this.props.changeCurrentPage(1);
  }

  onPageChange = (p) => {
      this.props.changeCurrentPage(p);
      this.props.toggleLoading();
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${p}`)
      .then(response => {
          this.props.toggleLoading();
          this.props.setUsers(response.data.items);
      });
  }

  render() {
    return <>
            {this.props.isLoading ? <Loading /> : null}
           <Users users={this.props.users}
                  currentPage={this.props.currentPage}
                  changeCurrentPage={this.props.changeCurrentPage}
                  onPageChange={this.onPageChange}
                  totalUsersCount={this.props.totalUsersCount}
                  pageSize={this.props.pageSize}
                  toggleFollow={this.props.toggleFollow}
                  profilePic={profilePic}
                  setUsers={this.props.setUsers}
                  toggleLoading={this.props.toggleFollow} />
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
    isLoading: state.usersPage.isLoading
  }
}


export default connect(mapStateToProps, { toggleFollow, setUsers, setUsersCount,
  changeCurrentPage, toggleLoading })(UsersContainer);


