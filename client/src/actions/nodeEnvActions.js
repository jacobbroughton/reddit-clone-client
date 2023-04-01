export const getApiUrl = () => {
  let API_URL

  if (import.meta.env.PROD) {
    API_URL = "https://reddit-clone-api.onrender.com"
  } else {
    API_URL = "http://localhost:5000"
  }

  return API_URL
}
