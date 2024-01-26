import axios from "axios"

const instance = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:5001/"
    // : "https://zeddit-backend.onrender.com/",
    : "https://api.zedditapp.com",
  withCredentials: true,
})

axios.defaults.baseURL = import.meta.env.DEV
  ? "http://localhost:5001/"
  // : "https://zeddit-backend.onrender.com/"
  : "https://api.zedditapp.com"

export default instance
