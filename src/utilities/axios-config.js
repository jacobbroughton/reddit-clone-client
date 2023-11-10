import axios from "axios"

const instance = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:5001/"
    // : "https://zeddit-backend.onrender.com/",
    : "https://www.jacobbroughton.com/",
  withCredentials: true,
})

axios.defaults.baseURL = import.meta.env.DEV
  ? "http://localhost:5001/"
  // : "https://zeddit-backend.onrender.com/"
  : "https://www.jacobbroughton.com/"

export default instance
