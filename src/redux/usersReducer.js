const TOGGLE_FOLLOW = 'TOGGLE-FOLLOW';
const SET_USERS = 'SET-USERS';

let initialState = {
        users: [
            {id:1, profilePicture: 'https://wiki-vk.ru/s/001/512/41.png', isFollowed: true, name: 'Sanya', status:'im loooseeeeeeeer', location: {city: 'Saint Petersburg', country: 'Russia'}},
            {id:2, profilePicture: 'https://wiki-vk.ru/s/001/512/41.png', isFollowed: false, name: 'Mr.Brightside', status:'jealosy turning saint into the sea', location: {city: 'London', country: 'UK'}},
            {id:3, profilePicture: 'https://wiki-vk.ru/s/001/512/41.png', isFollowed: true, name: 'LiSa', status:'Boku no koe ga hibiita toki ni', location: {city: 'Tokyo', country: 'Japan'}},
            {id:4, profilePicture: 'https://wiki-vk.ru/s/001/512/41.png', isFollowed: false, name: 'Circbraclet', status:'im like Eugen Tsyganov', location: {city: 'Nur Sultan', country: 'Kazakhstan'}}
        ],
};


const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case TOGGLE_FOLLOW: 
        return {
            ...state,
            users: state.users.map(u => {
                if(u.id === action.userId) {
                    return {...u, isFollowed: !u.isFollowed}
                }
                return u;
            })
        }
        
        case SET_USERS:{
            return {...state, users: [...state.users, ...action.users]}
        }
        default: {
            return state;
        }

    }

}

export const toggleFollowAC = (userId) => ({type: TOGGLE_FOLLOW, userId: userId});
export const setUsersAC = (users) => ({type: SET_USERS}, users);

export default usersReducer;