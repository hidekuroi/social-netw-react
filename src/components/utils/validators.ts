export const required = (value: string) => {
    if(value) return undefined;

    return 'Required field'
}

export const email = (value: string) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Invalid email address'
    }
    return undefined;
}

export const url = (value: string) => {
    if(/^(http|https):\/\/[^ "]+$/.test(value)) {
        return undefined;
    }
    if(!value) return undefined;
    
    return 'Invalid URL(s)'
}