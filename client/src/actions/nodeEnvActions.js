export const getApiUrl = () => {
  let API_URL;

  if(process.env.NODE_ENV === "production") {
    return API_URL = "https://reddit-clone-jb.herokuapp.com"
  } else {
    return API_URL = "http://localhost:5000"
  }
}