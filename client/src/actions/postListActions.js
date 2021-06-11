import axios from "../axios-config"
import moment from "moment"
import history from "../history"
import { setPost } from "../actions/postActions"
const API_URL = "http://localhost:5000"

export const getSubredditPosts = (subredditId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_SUBREDDIT_POSTS_REQUEST" })
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
  subredditId,
  subredditName
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
      subredditName,
      createdAt: dateNow,
      updatedAt: dateNow
    }
    

    const response = await axios.post(`${API_URL}/posts`, createdPost)

    let postId = response.data.insertId

    dispatch(getAllPosts())
    
    dispatch(setPost({
      id: postId,
      post_type: postType,
      title,
      body,
      author_id: authorId,
      subreddit_id: subredditId,
      subreddit_name: subredditName,
      created_at: dateNow,
      updated_at: dateNow
    }))

    // history.push(`/r/${createdPost.subredditName.replace(/\s+/g, '-')}/${postId}`)
    history.push(`/r/${createdPost.subredditName.replace(/\s+/g, '-')}/${postId}`)


  } catch (error) {
    dispatch({ 
      type: "CREATE_POST_FAILURE",
      message: error.message,
      response: error.response
    })
  }
}