export const getApiUrl = () => {
  let API_URL

  console.log(import.meta.env.NODE_ENV)

  if (import.meta.env.PROD) {
    API_URL = "https://reddit-clone-jb.herokuapp.com"
  } else {
    API_URL = "http://localhost:5000"
  }

  return API_URL
}
