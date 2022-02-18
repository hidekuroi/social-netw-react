import React, {useEffect} from 'react';
import Users from "./Users";
import { requestUsers, requestUsersWithFilters} from '../../redux/usersReducer';
import { actions } from '../../redux/usersReducer';
import Loading from '../common/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { getCurrentPage, getIsLoading, getPageSize, getFilter } from '../../redux/users-selector';
import { FilterType } from '../../types/types';
import { useHistory } from 'react-router-dom';
import * as queryString from 'querystring'

const changeCurrentPage = actions.changeCurrentPage
const setFilter = actions.setFilter

type QueryParamsType = { term?: string, page?: string, friend?: string }


const UsersContainer = () => {

  const filter = useSelector(getFilter)
  const isLoading = useSelector(getIsLoading)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)

  const dispatch = useDispatch()
  const history = useHistory();

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

    let actualPage = currentPage
    let actualFilter = filter

    if(!!parsed.page) actualPage = Number(parsed.page)
    if(!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

    switch(parsed.friend) {
        case 'null':
            actualFilter = {...actualFilter, friend: null}
            break;
        case 'true':
            actualFilter = {...actualFilter, friend: true}
            break;
        case 'false':
            actualFilter = {...actualFilter, friend: false}
            break;
    }  
    dispatch(setFilter(actualFilter))
    dispatch(changeCurrentPage(actualPage))
    dispatch(requestUsers(pageSize, actualPage, actualFilter));

    return () => {
      dispatch(changeCurrentPage(1));
      dispatch(setFilter({term: '', friend: null}))
    }
    
  }, []);

  useEffect(() => {
    const query: QueryParamsType = {}

    if(!!filter.term) query.term = filter.term
    if(filter.friend !== null) query.friend = String(filter.friend)
    if(currentPage !== 1) query.page = String(currentPage)

    history.push({
      pathname: '/users',
      search: queryString.stringify(query)
    })

  }, [filter, currentPage])

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

