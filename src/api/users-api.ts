import { UserType } from "../types/types"
import { DefaultResponseType, instance } from "./api"

type GetUsersResponseType = {
    totalCount: number,
    error: string,
    items: Array<UserType>
}

export const usersAPI = {
    getUsers(pageSize = 10, pageNumber = 1) {
        return instance.get<GetUsersResponseType>(`users?count=${pageSize}&page=${pageNumber}`)
        .then(response => response.data)
    },
    followUser(userId: number) {
        return instance.post<DefaultResponseType>(`follow/` + userId)
        .then(response => response.data)
    },
    unfollowUser(userId: number) {
        return instance.delete<DefaultResponseType>(`follow/` + userId)
        .then(response => response.data)
    }
}