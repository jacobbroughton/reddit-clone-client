import axios from "../axios-config"

const API_URL = "http://localhost:5000"

export const setCurrentSubreddit = (name) => async (dispatch, action) => {
  try {
    dispatch({ type: "SET_CURRENT_SUBREDDIT_REQUEST" })
    

    // let { name } = action.payload

    let response = await axios.get(`${API_URL}/subreddits/${name}`)

    let subreddit = response.data

    dispatch({ type: "SET_CURRENT_SUBREDDIT_SUCCESS", payload: subreddit })

  } catch (error) {
    dispatch({
      type: "SET_CURRENT_SUBREDDIT_FAILURE"
    })
  }
}