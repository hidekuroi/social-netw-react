export type PhotosType = {
    small: string | 'https://vk.com/sticker/1-64142-512',
    large: string | 'https://vk.com/sticker/1-64142-512'
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

export type FilterType = {
    term: string,
    friend: null | boolean
}

export type MessageType = {
    id: string
    body: string
    translatedBody: null | any
    addedAt: string
    senderId: number
    senderName: string
    recipientId: number
    viewed: boolean
}