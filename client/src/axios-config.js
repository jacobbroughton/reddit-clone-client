import axios from "axios"
// import store from "./store/store"

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
})

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL

export default instance