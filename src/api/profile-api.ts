import { PhotosType, UserPageType } from "../types/types";
import { DefaultResponseType, instance, ResultCodeEnum } from "./api";

type GetProfileResponse = UserPageType;
type UploadPhotoResponse = {
    data: {photos: PhotosType},
    resultCode: ResultCodeEnum,
    messages: Array<string>
}

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
        return instance.put<DefaultResponseType>('profile/status', {status})
        .then(response => response.data)
    },
    uploadPhoto(file: any) {
        let formData = new FormData();
        formData.append('image', file);

        return instance.put<UploadPhotoResponse>('profile/photo', formData).then(response => response)
    },
    uploadInfo(info: any){
        return instance.put<DefaultResponseType>('profile', info)
        .then(response => response.data);
    }
}
