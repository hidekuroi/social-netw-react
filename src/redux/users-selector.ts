import { RootState } from "./redux-store";

export const getUsers = (state: RootState) => {
    return state.usersPage.users;
}

export const getPageSize = (state: RootState) => {
    return state.usersPage.pageSize;
}

export const getCurrentPage = (state: RootState) => {
    return state.usersPage.currentPage;
}

export const getTotalUsersCount = (state: RootState) => {
    return state.usersPage.totalUsersCount;
}

export const getIsLoading = (state: RootState) => {
    return state.usersPage.isLoading;
}

export const getFollowingProgress = (state: RootState) => {
    return state.usersPage.followingProgress;
}

export const isAuthCheck = (state: RootState) => {
    return state.auth.isAuth;
}

