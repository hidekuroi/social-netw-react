import { getCaptcha } from './../redux/authReducer';
import axios from 'axios';
import { PhotosType, UserPageType, UserType } from '../types/types';
import APIKey from './apikey';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': APIKey
    }
});

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    Success = 0,
    Error = 1,
    Captcha = 10
}

export type DefaultResponseType = {
    data: {},
    resultCode: ResultCodeEnum,
    messages: Array<string>
}

export type IsAuthResponseType = {
    data: {
        id: number,
        email: string,
        login: string
    },
    resultCode: ResultCodeEnum
}

type LoginResponseType = {
    data: {
        userId: number
    },
    resultCode: ResultCodeForCaptcha
    messages: Array<string>
}

type LogoutResponseType = DefaultResponseType

export const authAPI = {
    isAuth() {
        return instance.get<IsAuthResponseType>(`auth/me`)
        .then(response => response)
    },
    login(formData: any) {
        return instance.post<LoginResponseType>(`auth/login`, {...formData})
        .then(response => response.data)
    },
    logout() {
        return instance.delete<LogoutResponseType>(`auth/login`)
        .then(response => response.data);
    }
}

type GetUsersResponseType = {
    totalCount: number,
    error: string,
    items: Array<UserType>
}

export const usersAPI = {
    getUsers(pageSize = 10, pageNumber = 1) {
        return instance.get<GetUsersResponseType>(`users?count=${pageSize}&page=${pageNumber}`)
        .then(response => response.data)
    }
}

type GetProfileResponse = UserPageType;
type UpdateStatusResponse = DefaultResponseType
type UploadPhotoResponse = {
    data: {photos: PhotosType},
    resultCode: ResultCodeEnum,
    messages: Array<string>
}
type UploadInfoResponse = DefaultResponseType

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<GetProfileResponse>(`profile/` + userId)
        .then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
        .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusResponse>('profile/status', {status})
        .then(response => response.data)
    },
    uploadPhoto(file: any) {
        let formData = new FormData();
        formData.append('image', file);

        return instance.put<UploadPhotoResponse>('profile/photo', formData).then(response => response)
    },
    uploadInfo(info: any){
        return instance.put<UploadInfoResponse>('profile', info)
        .then(response => response.data);
    }
}

type getCaptchaResponse = {
    url: string
}

export const securityAPI = {
    getCaptcha() {
        return instance.get<getCaptchaResponse>('security/get-captcha-url')
        .then(response => response.data)
    }
}

type FollowUserResponse = DefaultResponseType;
type UnfollowUserResponse = FollowUserResponse;

export const followAPI = {
    followUser(userId: number) {
        return instance.post<FollowUserResponse>(`follow/` + userId)
        .then(response => response.data)
    },
    unfollowUser(userId: number) {
        return instance.delete<UnfollowUserResponse>(`follow/` + userId)
        .then(response => response.data)
    }
}