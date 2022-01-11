import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { usersAPI, followAPI } from '../api/api';
import { UserType } from './../types/types';
import { RootState } from './redux-store';

const TOGGLE_FOLLOW = '/usersPage/TOGGLE-FOLLOW';
const SET_USERS = '/usersPage/SET-USERS';
const SET_USERS_COUNT = '/usersPage/SET-USERS-COUNT';
const CHANGE_CURRENT_PAGE = '/usersPage/CHANGE-CURRENT-PAGE';
const TOGGLE_LOADING = '/usersPage/TOGGLE-LOADING';
const ADD_FOLLOWING_USER = '/usersPage/ADD_FOLLOWING_USER';


type InitialStateType = {
    users: Array<UserType>,
    followingProgress: Array<number>,
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    isLoading: boolean
}

let initialState: InitialStateType = {
        users: [
            // {id:1, profilePicture: 'https://wiki-vk.ru/s/001/512/41.png', followed: true, name: 'Sanya', status:'im loooseeeeeeeer', location: {city: 'Saint Petersburg', country: 'Russia'}},
            // {id:2, profilePicture: 'https://wiki-vk.ru/s/001/512/41.png', followed: false, name: 'Mr.Brightside', status:'jealosy turning saint into the sea', location: {city: 'London', country: 'UK'}},
            // {id:3, profilePicture: 'https://wiki-vk.ru/s/001/512/41.png', followed: true, name: 'LiSa', status:'Boku no koe ga hibiita toki ni', location: {city: 'Tokyo', country: 'Japan'}},
            // {id:4, profilePicture: 'https://wiki-vk.ru/s/001/512/41.png', followed: false, name: 'Circbraclet', status:'im like Eugen Tsyganov', location: {city: 'Nur Sultan', country: 'Kazakhstan'}}
        ],
        followingProgress: [],
        totalUsersCount: 0,
        pageSize: 20,
        currentPage: 1,
        isLoading: false
};


const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type){
        case TOGGLE_FOLLOW: 
        return {
            ...state,
            users: state.users.map(u => {
                if(u.id === action.userId) {
                    return {...u, followed: !u.followed}
                }
                return u;
            })
        }
        
        case SET_USERS:{
            return {...state, users: action.users}
        }

        case SET_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }

        case CHANGE_CURRENT_PAGE: {
            let stateCopy = {...state, currentPage: action.page}
            return stateCopy;
        }

        case TOGGLE_LOADING: {
            return {...state, isLoading: !state.isLoading};
        }
        case ADD_FOLLOWING_USER: {
          return {
              ...state,
              followingProgress: action.isFollowingInProgress
                 ? [...state.followingProgress, action.userId]
                 : state.followingProgress.filter(id => id !== action.userId)
          }
        }

        default: {
            return state;
        }

    }

}

type ActionsTypes = ToggleFollowType | SetUsersType | SetUsersCountType |
    ChangeCurrentPageType | ToggleLoadingType | AddFollowingUserType


type ToggleFollowType = {
    type: typeof TOGGLE_FOLLOW,
    userId: number
}
export const toggleFollow = (userId: number): ToggleFollowType => ({type: TOGGLE_FOLLOW, userId});

type SetUsersType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersType => ({type: SET_USERS, users});

type SetUsersCountType = {
    type: typeof SET_USERS_COUNT,
    count: number
}
export const setUsersCount = (count: number): SetUsersCountType => ({type: SET_USERS_COUNT, count});

type ChangeCurrentPageType = {
    type: typeof CHANGE_CURRENT_PAGE,
    page: number
}
export const changeCurrentPage = (page: number): ChangeCurrentPageType => ({type: CHANGE_CURRENT_PAGE, page});

type ToggleLoadingType = {
    type: typeof TOGGLE_LOADING
}
export const toggleLoading = (): ToggleLoadingType => ({type: TOGGLE_LOADING});

type AddFollowingUserType = {
    type: typeof ADD_FOLLOWING_USER,
    isFollowingInProgress: boolean,
    userId: number
}
export const addFollowingUser = (isFollowingInProgress: boolean, userId: number): AddFollowingUserType => ({type: ADD_FOLLOWING_USER, isFollowingInProgress, userId});


type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsTypes>

export const requestUsers = (pageSize: number, page = 1): ThunkType => {   
   return async (dispatch: DispatchType) => {
    dispatch(toggleLoading());
     let data = await usersAPI.getUsers(pageSize, page);
        dispatch(setUsers(data.items));
        dispatch(setUsersCount(data.totalCount));
        dispatch(toggleLoading());
   }

}

const followFlow = async (dispatch: DispatchType, apiMethod: Function, userId: number) => {
        dispatch(addFollowingUser(true, userId));
        let data = await apiMethod(userId);
                dispatch(addFollowingUser(false, userId));
                if(data.resultCode === 0){
                    dispatch(toggleFollow(userId));
                }               
} 

export const followUser = (userId: number): ThunkType => {
    return async(dispatch: DispatchType) => {
        followFlow(dispatch, followAPI.followUser, userId);              
    }
}

export const unfollowUser = (userId: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        followFlow(dispatch, followAPI.unfollowUser, userId);                     
    }
}


export default usersReducer;