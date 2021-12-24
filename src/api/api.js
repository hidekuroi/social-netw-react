import * as axios from 'axios';
import Login from '../components/Login/Login';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '8f8fa960-1bac-4e4d-8bd0-46e5a7d17c31'
    }
});

export const authAPI = {
    isAuth() {
        return instance.get(`auth/me`)
        .then(response => response.data)
    },
    login(formData) {
        return instance.post(`auth/login`, {...formData})
        .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
        .then(response => response.data);
    }
}

export const usersAPI = {
    getUsers(pageSize = 10, pageNumber = 1) {
        return instance.get(`users?count=${pageSize}&page=${pageNumber}`)
        .then(response => response.data)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
        .then(response => response.data)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
        .then(response => response.data)
    },
    updateStatus(status) {
        return instance.put('profile/status', {status})
        .then(response => response.data)
    }
}

export const followAPI = {
    followUser(userId) {
        return instance.post(`follow/` + userId).
        then(response => response.data)
    },
    unfollowUser(userId) {
        return instance.delete(`follow/` + userId).
        then(response => response.data)
    }
}