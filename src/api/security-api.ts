import { instance } from "./api"

type getCaptchaResponse = {
    url: string
}

export const securityAPI = {
    getCaptcha() {
        return instance.get<getCaptchaResponse>('security/get-captcha-url')
        .then(response => response.data)
    }
}

