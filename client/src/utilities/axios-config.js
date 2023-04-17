import axios from "axios"

const instance = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:5000/"
    : "https://zeddit-api.onrender.com/",
  withCredentials: true,
})

axios.defaults.baseURL = import.meta.env.DEV
  ? "http://localhost:5000/"
  : "https://zeddit-api.onrender.com/"

export default instance
