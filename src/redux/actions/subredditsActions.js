import axios from "../../utils/axios-config.js"
import moment from "moment"
import history from "../../utils/history"
import { getApiUrl } from "./nodeEnvActions"

const API_URL = getApiUrl()

export const getSubreddits = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_SUBREDDITS_REQUEST" })

    const response = await axios.get(`${API_URL}/subreddits`)

    if (response.status !== 200) {
      throw response.data.message
    }

    dispatch({ type: "GET_SUBREDDITS_SUCCESS", payload: response.data })
  } catch (error) {
    dispatch({
      type: "GET_SUBREDDITS_FAILURE",
      message: error.response.data.message,
    })
  }
}

export const getSingleSubreddit = (name) => async (dispatch) => {
  try {
    dispatch({ type: "GET_SINGLE_SUBREDDIT_REQUEST" })

    const response = await axios.get(`${API_URL}/subreddits/${name}`)

    if (response.status !== 200) {
      throw response.data.message
    }

    dispatch({
      type: "GET_SINGLE_SUBREDDIT_SUCCESS",
      payload: response,
    })
  } catch (error) {
    dispatch({
      type: "GET_SINGLE_SUBREDDIT_FAILURE",
      message: error.response.data.message,
    })
  }
}

export const createSubreddit =
  (userId, name, description) => async (dispatch) => {
    try {
      dispatch({ type: "CREATE_SUBREDDIT_REQUEST" })

      let dateNow = moment().format("MMMM Do YYYY")

      let newSubreddit = {
        id: 0,
        userId,
        name,
        description,
        createdAt: dateNow,
      }

      const response = await axios.post(`${API_URL}/subreddits`, newSubreddit)

      if (response.status !== 200) {
        throw response.data.message
      }

      newSubreddit.id = response.data.idForNewSubreddit

      dispatch({ type: "CREATE_SUBREDDIT_SUCCESS", payload: newSubreddit })

      dispatch(getSingleSubreddit(newSubreddit.name))

      history.push(`/r/${newSubreddit.name}/`)
    } catch (error) {
      dispatch({
        type: "CREATE_SUBREDDIT_FAILURE",
        message: error.response.data.message,
      })
    }
  }

export const deleteSubreddit = (userId, subredditId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_SUBREDDIT_REQUEST" })

    const response = await axios.delete(`${API_URL}/subreddits/${subredditId}/${userId}`)

    if (response.status !== 200) {
      throw response.data.message
    }

    history.push("/")

    dispatch({
      type: "DELETE_SUBREDDIT_SUCCESS",
      payload: subredditId,
    })
  } catch (error) {
    dispatch({
      type: "DELETE_SUBREDDIT_FAILURE",
      message: error.response.data.message,
    })
  }
}
