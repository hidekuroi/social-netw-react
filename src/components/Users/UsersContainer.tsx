import React, {useEffect} from 'react';
import Users from "./Users";
import { requestUsers, followUser, unfollowUser, requestUsersWithFilters} from '../../redux/usersReducer';
import { actions } from '../../redux/usersReducer';
import Loading from '../common/Loading';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { getCurrentPage, isAuthCheck, getFollowingProgress, getIsLoading, getPageSize, getTotalUsersCount, getUsers, getFilter } from '../../redux/users-selector';
import { RootState } from '../../redux/redux-store';
import { FilterType } from '../../types/types';

const changeCurrentPage = actions.changeCurrentPage
const toggleLoading = actions.toggleLoading
const setFilter = actions.setFilter

let profilePic = 'https://wiki-vk.ru/s/001/512/41.png';

type PropsType = ConnectedProps<typeof container>

const UsersContainer = (props: PropsType) => {
    
  useEffect(() => {
    props.requestUsers(props.pageSize, props.currentPage, { term: props.filter.term, friend: props.filter.friend });
    
    return () => {
      props.changeCurrentPage(1);
      props.setFilter({term: '', friend: null})
    }
  }, [])


  let onPageChange = (page: number): void => {
      props.changeCurrentPage(page);
      props.requestUsers(props.pageSize, page, {term: props.filter.term, friend: props.filter.friend});
  }

  let onFilterSet = (filter: FilterType) => {
    props.changeCurrentPage(1);
    props.requestUsersWithFilters(props.pageSize, 1, {term: filter.term, friend: null})
  }



    return <>
            {props.isLoading ? <Loading color={'gray'}/> : null}
           <Users {...props} onPageChange={onPageChange} onFilterSet={onFilterSet}/>
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
    isAuth: isAuthCheck(state),
    filter: getFilter(state)
  }
}

let container = connect(mapStateToProps, { setFilter, requestUsersWithFilters, changeCurrentPage, toggleLoading,
   requestUsers, followUser, unfollowUser })

export default compose(
  React.memo,
  container
)(UsersContainer);

