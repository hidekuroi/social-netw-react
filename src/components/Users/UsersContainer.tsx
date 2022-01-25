import React, {useEffect} from 'react';
import Users from "./Users";
import { requestUsers, requestUsersWithFilters} from '../../redux/usersReducer';
import { actions } from '../../redux/usersReducer';
import Loading from '../common/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { getCurrentPage, getIsLoading, getPageSize, getFilter } from '../../redux/users-selector';
import { FilterType } from '../../types/types';

const changeCurrentPage = actions.changeCurrentPage
const setFilter = actions.setFilter

const UsersContainer = () => {
    
  useEffect(() => {
    dispatch(requestUsers(pageSize, currentPage, { term: filter.term, friend: filter.friend }));
    
    return () => {
      dispatch(changeCurrentPage(1));
      dispatch(setFilter({term: '', friend: null}))
    }
  }, [])

  const filter = useSelector(getFilter)
  const isLoading = useSelector(getIsLoading)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)

  const dispatch = useDispatch()

  let onPageChange = (page: number): void => {
      dispatch(changeCurrentPage(page));
      dispatch(requestUsers(pageSize, page, {term: filter.term, friend: filter.friend}));
  }

  let onFilterSet = (filter: FilterType) => {
    dispatch(changeCurrentPage(1));
    dispatch(requestUsersWithFilters(pageSize, 1, {term: filter.term, friend: filter.friend}))
  }

    return <>
            {isLoading ? <Loading color={'gray'}/> : null}
           <Users filter={filter} onPageChange={onPageChange} onFilterSet={onFilterSet}/>
          </>
  
}

export default compose(
  React.memo,
)(UsersContainer);

