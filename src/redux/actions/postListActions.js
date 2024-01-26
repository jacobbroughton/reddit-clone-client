import axios from "../../utils/axios-config"
import history from "../../utils/history"
import { setPost } from "./postActions"
import { formatISO9075 } from "date-fns"
import { getApiUrl } from "./nodeEnvActions"

const API_URL = getApiUrl()

export const getPosts = (userId, filters) => async (dispatch) => {
  try {
    dispatch({ type: "GET_POSTS_REQUEST" })

    let response = await axios.get(`${API_URL}/posts`, {
      params: { userId, filters },
    })

    if (response.status !== 200) {
      throw response.data.message
    }

    dispatch({ type: "GET_POSTS_SUCCESS", payload: response.data })
  } catch (error) {
    console.log(error)
    dispatch({
      type: "GET_POSTS_FAILURE",
      message: error.response.data.message,
    })
  }
}

export const handleVote = (userId, postId, value) => async (dispatch) => {
  try {
    dispatch({ type: "POST_VOTE_REQUEST" })

    let voteObj = {
      userId,
      postId,
      value,
    }

    console.log(voteObj)

    const response = await axios.post(`${API_URL}/votes/post`, { data: voteObj })

    if (response.status !== 200) {
      throw response.data.message
    }

    dispatch({ type: "POST_VOTE_SUCCESS", payload: voteObj })
  } catch (error) {
    console.log(error)
    dispatch({
      type: "POST_VOTE_FAILURE",
      message: error.response.data.message,
      
    })
  }
}

export const createPost =
  ({ postType, title, body, authorId, subredditId, subredditName }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "CREATE_POST_REQUEST" })

      let dateNow = formatISO9075(new Date())

      const createdPost = {
        postType,
        title,
        body,
        authorId,
        subredditId,
        subredditName,
      }

      const response = await axios.post(`${API_URL}/posts`, createdPost)

      if (response.status !== 200) {
        throw response.data.message
      }

      let postId = response.data.insertId

      dispatch(
        setPost({
          id: postId,
          post_type: postType,
          title,
          body,
          vote_count: 0,
          author_id: authorId,
          subreddit_id: subredditId,
          subreddit_name: subredditName,
          created_at: dateNow,
          updated_at: dateNow,
        })
      )

      history.push(
        `/r/${createdPost.subredditName.replace(/\s+/g, "-")}/${postId}`
      )
    } catch (error) {
      dispatch({
        type: "CREATE_POST_FAILURE",
        message: error.response.data.message,
      })
    }
  }
