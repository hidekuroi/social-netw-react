const TOGGLE_FOLLOW = 'TOGGLE-FOLLOW';
const SET_USERS = 'SET-USERS';
const SET_USERS_COUNT = 'SET-USERS-COUNT';
const CHANGE_CURRENT_PAGE = 'CHANGE-CURRENT-PAGE';
const TOGGLE_LOADING = 'TOGGLE-LOADING';

let initialState = {
        users: [
            // {id:1, profilePicture: 'https://wiki-vk.ru/s/001/512/41.png', followed: true, name: 'Sanya', status:'im loooseeeeeeeer', location: {city: 'Saint Petersburg', country: 'Russia'}},
            // {id:2, profilePicture: 'https://wiki-vk.ru/s/001/512/41.png', followed: false, name: 'Mr.Brightside', status:'jealosy turning saint into the sea', location: {city: 'London', country: 'UK'}},
            // {id:3, profilePicture: 'https://wiki-vk.ru/s/001/512/41.png', followed: true, name: 'LiSa', status:'Boku no koe ga hibiita toki ni', location: {city: 'Tokyo', country: 'Japan'}},
            // {id:4, profilePicture: 'https://wiki-vk.ru/s/001/512/41.png', followed: false, name: 'Circbraclet', status:'im like Eugen Tsyganov', location: {city: 'Nur Sultan', country: 'Kazakhstan'}}
        ],
        totalUsersCount: 0,
        pageSize: 10,
        currentPage: 1,
        isLoading: true
};


const usersReducer = (state = initialState, action) => {
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

        default: {
            return state;
        }

    }

}

export const toggleFollow = (userId) => ({type: TOGGLE_FOLLOW, userId: userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setUsersCount = (count) => ({type: SET_USERS_COUNT, count});
export const changeCurrentPage = (page) => ({type: CHANGE_CURRENT_PAGE, page});
export const toggleLoading = () => ({type: TOGGLE_LOADING})

export default usersReducer;