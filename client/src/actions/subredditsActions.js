import axios from "../axios-config.js"
import moment from "moment"
import history from "../history"
import { getApiUrl } from "../actions/nodeEnvActions"


const API_URL = getApiUrl()


export const getSubreddits = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_SUBREDDITS_REQUEST" })

    const response = await axios.get(`${API_URL}/subreddits`)
    
    dispatch({ type: "GET_SUBREDDITS_SUCCESS", payload: response.data })

  } catch (error) {
    dispatch({ 
      type: "GET_SUBREDDITS_FAILURE",
      message: error.message,
      response: error.response
    })
  }
}

export const getSingleSubreddit = (name) => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_SINGLE_SUBREDDIT_REQUEST" })

    const subreddit = await axios.get(`${API_URL}/subreddits/${name}`)

    dispatch({ 
      type: "GET_SINGLE_SUBREDDIT_SUCCESS", 
      payload: subreddit 
    })


  } catch (error) {
    dispatch({
      type: "GET_SINGLE_SUBREDDIT_FAILURE",
      message: error.message,
      response: error.response
    })
  }
}

export const createSubreddit = (userId, name, description) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CREATE_SUBREDDIT_REQUEST" })

    let dateNow = moment().format("MMMM Do YYYY");

    name = name.trim();

    let newSubreddit = {
      id: 0,
      userId,
      name, 
      description,
      createdAt: dateNow
    }

    const response = await axios.post(`${API_URL}/subreddits`, newSubreddit)

    newSubreddit.id = response.data.idForNewSubreddit

    dispatch({ type: "CREATE_SUBREDDIT_SUCCESS", payload: newSubreddit})

    dispatch(getSingleSubreddit(newSubreddit.name))

    history.push(`/r/${newSubreddit.name}/`)


    // const subreddit = await axios.get(`${API_URL}/subreddits/${name}`)
    
    
  } catch (error) {
    dispatch({ 
      type: "CREATE_SUBREDDIT_FAILURE",
      message: error.message,
      response: error.response
    })
  }
}

export const deleteSubreddit = (userId, subredditId) => async (dispatch, action) => {
  try {
    dispatch({ type: "DELETE_SUBREDDIT_REQUEST" })

    let response = await axios.delete(`${API_URL}/subreddits/${subredditId}/${userId}`)
    history.push("/")

    dispatch({ 
      type: "DELETE_SUBREDDIT_SUCCESS",
      payload: subredditId
   })

  } catch (error) {
    dispatch({
      type: "DELETE_SUBREDDIT_FAILURE",
      response: error.response,
      message: error.message
    })
  }
}