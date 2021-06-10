import axios from "../axios-config.js"
import moment from "moment"
import history from "../history"


const API_URL = "http://localhost:5000"


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

export const createSubreddit = (name, description) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CREATE_SUBREDDIT_REQUEST" })

    let dateNow = moment().format("MMMM Do YYYY");

    let newSubreddit = {
      id: 0,
      name, 
      description,
      createdAt: dateNow
    }

    const response = await axios.post(`${API_URL}/subreddits`, newSubreddit)
    console.log(response)

    let idForNewSubreddit = response.data.idForNewSubreddit

    newSubreddit.id = idForNewSubreddit    

    ({ type: "CREATE_SUBREDDIT_SUCCESS", payload: newSubreddit})

    dispatch(getSingleSubreddit(newSubreddit.name))

    history.push(`/r/${newSubreddit.name.replace(/\s+/g, '-')}`)



    // const subreddit = await axios.get(`${API_URL}/subreddits/${name}`)
    // console.log(subreddit)
    
    
  } catch (error) {
    dispatch({ 
      type: "CREATE_SUBREDDIT_FAILURE",
      message: error.message,
      response: error.response
    })
  }
}