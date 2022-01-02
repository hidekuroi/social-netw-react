export const getUsers = (state) => {
    return state.usersPage.users;
}

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getIsLoading = (state) => {
    return state.usersPage.isLoading;
}

export const getFollowingProgress = (state) => {
    return state.usersPage.followingProgress;
}

export const isAuthCheck = (state) => {
    return state.auth.isAuth;
}

