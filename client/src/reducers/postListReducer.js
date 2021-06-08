import axios from "axios"
import moment from "moment"
import history from "../history"

export const postListReducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE_POST_SUCCESS": 
      return [...state, action.payload]
    case "GET_ALL_POSTS_SUCCESS" :
      return action.payload
    case "GET_SUBREDDIT_POSTS_SUCCESS" :
        return action.payload
    default:
      return state
  }
}

const API_URL = "http://localhost:5000"

export const getSubredditPosts = (subredditId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_SUBREDDIT_POSTS_REQUEST" })
    console.log(subredditId)
    let response = await axios.get(`${API_URL}/posts/${subredditId}`)

    dispatch({ type: "GET_SUBREDDIT_POSTS_SUCCESS", payload: response.data })

  } catch (error) {
    dispatch({ 
      type: "GET_SUBREDDIT_POSTS_FAILURE",
      message: error.message,
      response: error.response
     })
  }
}

export const getAllPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_ALL_POSTS_REQUEST" })

    let response = await axios.get(`${API_URL}/posts`)

    dispatch({ type: "GET_ALL_POSTS_SUCCESS", payload: response.data })

  } catch (error) {
    dispatch({ 
      type: "GET_ALL_POSTS_FAILURE",
      message: error.message,
      response: error.response
    })
  }
} 


export const createPost = ({
  postType,
  title,
  body,
  authorId,
  subredditId
}) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CREATE_POST_REQUEST" })

    let dateNow = moment().format("MMMM Do YYYY");

    const createdPost = {
      postType,
      title,
      body,
      authorId,
      subredditId,
      createdAt: dateNow,
      updatedAt: dateNow
    }
    

    await axios.post(`${API_URL}/posts`, createdPost)
    dispatch(getAllPosts())
    history.push("/")


  } catch (error) {
    dispatch({ 
      type: "CREATE_POST_FAILURE",
      message: error.message,
      response: error.response
    })
  }
}