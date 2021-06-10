import axios from "../axios-config"
import { useParams } from "react-router-dom"

const API_URL = "http://localhost:5000"

export const setCurrentSubreddit = (name) => async (dispatch, action) => {
  try {
    dispatch({ type: "SET_CURRENT_SUBREDDIT_REQUEST" })
    

    // let { name } = action.payload

    let subreddit = await axios.get(`${API_URL}/subreddits/${name}`)

    console.log(subreddit)

  } catch (error) {
    dispatch({
      type: "SET_CURRENT_SUBREDDIT_FAILURE"
    })
  }
}