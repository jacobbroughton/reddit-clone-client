import axios from "axios"
// import store from "./store/store"

const instance = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? 'http://localhost:5000/' : 'https://reddit-clone-jb.herokuapp.com/',
    withCredentials: true
})

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? 'http://localhost:5000/' : 'https://reddit-clone-jb.herokuapp.com/'

export default instance