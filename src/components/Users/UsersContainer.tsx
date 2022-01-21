import React, {useEffect} from 'react';
import Users from "./Users";
import { requestUsers, followUser, unfollowUser} from '../../redux/usersReducer';
import { actions } from '../../redux/usersReducer';
import Loading from '../common/Loading';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { getCurrentPage, isAuthCheck, getFollowingProgress, getIsLoading, getPageSize, getTotalUsersCount, getUsers } from '../../redux/users-selector';
import { RootState } from '../../redux/redux-store';

const changeCurrentPage = actions.changeCurrentPage
const toggleLoading = actions.toggleLoading

let profilePic = 'https://wiki-vk.ru/s/001/512/41.png';

type PropsType = ConnectedProps<typeof container>

const UsersContainer = (props: PropsType) => {
    
  useEffect(() => {
    props.requestUsers(props.pageSize);
    
    return () => {
      props.changeCurrentPage(1);
    }
  }, [])


  let onPageChange = (page: number): void => {
      props.changeCurrentPage(page);
      props.requestUsers(props.pageSize, page);
  }



    return <>
            {props.isLoading ? <Loading color={'gray'}/> : null}
           <Users {...props} onPageChange={onPageChange} />
          </>
  
}

let mapStateToProps = (state: RootState) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    currentPage: getCurrentPage(state),
    totalUsersCount: getTotalUsersCount(state),
    profilePic: profilePic,
    isLoading: getIsLoading(state),
    followingProgress: getFollowingProgress(state),
    isAuth: isAuthCheck(state)
  }
}

let container = connect(mapStateToProps, { changeCurrentPage, toggleLoading, requestUsers, followUser, unfollowUser })

export default compose(
  React.memo,
  container
)(UsersContainer);

