export const getApiUrl = () => {
  let API_URL


  if (import.meta.env.PROD) {
    API_URL = "https://api.zedditapp.com"
  } else {
    API_URL = "http://localhost:5001"
  }

  return API_URL
}
