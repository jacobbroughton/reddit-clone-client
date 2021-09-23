export const getApiUrl = () => {
  let API_URL;

  if(process.env.NODE_ENV === "production") {
    API_URL = "https://zeddit.herokuapp.com"
  } else {
    API_URL = "http://localhost:5000"
  }

  return API_URL
}