import axios from "../axios-config"
// import moment from "moment"
import history from "../history"
import { setPost } from "../actions/postActions"
import { formatISO9075 } from "date-fns"
import { getApiUrl } from "../actions/nodeEnvActions"

const API_URL = getApiUrl()



export const getPosts = (filters) => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_POSTS_REQUEST" })

    let response = await axios.get(`${API_URL}/posts`, { params: { filters }})

    console.log(response.data)

    dispatch({ type: "GET_POSTS_SUCCESS", payload: response.data })

  } catch (error) {
    dispatch({ 
      type: "GET_POSTS_FAILURE",
      message: error.message,
      response: error.response
    })
  }
} 


export const handleVote = (userId, postId, value) => async (dispatch, getState) => {
  try {
    dispatch({ type: "POST_VOTE_REQUEST" })

    await axios.post(`${API_URL}/votes`, { data: { userId, postId, value } })
    
    dispatch({ type: "POST_VOTE_SUCCESS" })
  } catch (error) {
    console.log(error)
    dispatch({ type: "POST_VOTE_FAILURE" })
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

    let dateNow = formatISO9075(new Date()) 
    console.log("POST DATE NOW", dateNow)

    const createdPost = {
      postType,
      title,
      body,
      authorId,
      subredditId,
      subredditName
    }
    

    const response = await axios.post(`${API_URL}/posts`, createdPost)

    let postId = response.data.insertId

    // dispatch(getPosts())
    
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

    history.push(`/r/${createdPost.subredditName.replace(/\s+/g, '-')}/${postId}`)


  } catch (error) {
    dispatch({ 
      type: "CREATE_POST_FAILURE",
      message: error.message,
      response: error.response
    })
  }
}