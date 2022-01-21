export type PhotosType = {
    small: string | 'https://wiki-vk.ru/s/001/512/41.png',
    large: string | 'https://wiki-vk.ru/s/001/512/41.png'
}
export type PostType = {
    id: number,
    text: string,
    likesCount: number
}
export type ContactsType = {
    facebook: string | null,
    website: string | null,
    vk: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    github: string | null,
    mainLink: string | null,
}
export type UserPageType = {
    aboutMe: string,
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: PhotosType
}


export type UserType = {
    name: string,
    id: number,
    uniqueUrlName: string | null,
    photos: PhotosType,
    status: string | null,
    followed: boolean
}