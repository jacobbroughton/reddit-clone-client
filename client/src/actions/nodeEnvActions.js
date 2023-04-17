export const getApiUrl = () => {
  let API_URL

  if (import.meta.env.PROD) {
    API_URL = "https://zeddit-api.onrender.com"
  } else {
    API_URL = "http://localhost:6000"
  }

  return API_URL
}
