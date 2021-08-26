import axios from "../axios-config"
import { getApiUrl } from "../actions/nodeEnvActions"

const API_URL = getApiUrl()

export const setCurrentSubreddit = (name) => async (dispatch) => {
  try {
    dispatch({ type: "SET_CURRENT_SUBREDDIT_REQUEST" })

    if(name) {
      let response = await axios.get(`${API_URL}/subreddits/${name}`)
      console.log(response)
  
      let subreddit = response.data === '' ? null  : response.data
  
      dispatch({ type: "SET_CURRENT_SUBREDDIT_SUCCESS", payload: subreddit })
    } else {
      dispatch({ type: "SET_CURRENT_SUBREDDIT_SUCCESS", payload: null })
    }

  } catch (error) {
    dispatch({
      type: "SET_CURRENT_SUBREDDIT_FAILURE"
    })
  }
}
