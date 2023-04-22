import axios from "../utilities/axios-config"
import { getApiUrl } from "../actions/nodeEnvActions"
import he from "he"

const API_URL = getApiUrl()

export const setCurrentSubreddit = (name) => async (dispatch) => {
  try {
    dispatch({ type: "SET_CURRENT_SUBREDDIT_REQUEST" })

    if (name) {
      let response = await axios.get(`${API_URL}/subreddits/${name}`)

      let subreddit = response.data === "" ? null : response.data

      subreddit = {
        ...subreddit,
        name: he.decode(subreddit.name),
        description: he.decode(subreddit.description),
      }

      dispatch({ type: "SET_CURRENT_SUBREDDIT_SUCCESS", payload: subreddit })
    } else {
      dispatch({ type: "SET_CURRENT_SUBREDDIT_SUCCESS", payload: null })
    }
  } catch (error) {
    dispatch({
      type: "SET_CURRENT_SUBREDDIT_FAILURE",
      message: error.message,
      response: error.response.data,
    })
  }
}
