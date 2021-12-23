export const required = value => {
    if(value) return undefined;

    return 'Required field'
}

export const email = value => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Invalid email address'
    }
    return undefined;
}
