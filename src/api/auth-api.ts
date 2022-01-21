import { DefaultResponseType, instance, ResultCodeForCaptcha } from "./api"

export type IsAuthResponseType = {
    id: number,
    email: string,
    login: string
}

type LoginResponseType = {
    userId: number
}

export const authAPI = {
isAuth() {
    return instance.get<DefaultResponseType<IsAuthResponseType>>(`auth/me`)
    .then(response => response)
},
login(formData: any) {
    return instance.post<DefaultResponseType<LoginResponseType, ResultCodeForCaptcha>>(`auth/login`, {...formData})
    .then(response => response.data)
},
logout() {
    return instance.delete<DefaultResponseType>(`auth/login`)
    .then(response => response.data);
}
}