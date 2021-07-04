import axios from "../axios-config"
import { getApiUrl } from "../actions/nodeEnvActions"

const API_URL = getApiUrl()

export const setCurrentSubreddit = (name) => async (dispatch, action) => {
  try {
    dispatch({ type: "SET_CURRENT_SUBREDDIT_REQUEST" })

    let response = await axios.get(`${API_URL}/subreddits/${name}`)

    let subreddit = response.data === '' ? null  : response.data

    dispatch({ type: "SET_CURRENT_SUBREDDIT_SUCCESS", payload: subreddit })

  } catch (error) {
    dispatch({
      type: "SET_CURRENT_SUBREDDIT_FAILURE"
    })
  }
}