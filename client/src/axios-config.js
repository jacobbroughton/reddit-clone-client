import axios from "axios"

const instance = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? 'http://localhost:5000/' : 'https://zeddit.herokuapp.com/',
    withCredentials: true
})

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? 'http://localhost:5000/' : 'https://zeddit.herokuapp.com/'

export default instance