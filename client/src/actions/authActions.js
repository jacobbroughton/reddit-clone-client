export const LOGIN_REQUEST = (user) => ({
    type: 'LOGIN_REQUEST'
})

export const LOGIN_SUCCESS = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user
})