import axios from "../utilities/axios-config"
import history from "../utilities/history"
import { setPost } from "../actions/postActions"
import { formatISO9075 } from "date-fns"
import { getApiUrl } from "../actions/nodeEnvActions"
// import escapeHTML from "../utilities/escapeHTML"

const API_URL = getApiUrl()

export const getPosts = (userId, filters) => async (dispatch) => {
  try {
    dispatch({ type: "GET_POSTS_REQUEST" })

    let response = await axios.get(`${API_URL}/posts`, {
      params: { userId, filters },
    })

    dispatch({ type: "GET_POSTS_SUCCESS", payload: response.data })
  } catch (error) {
    dispatch({
      type: "GET_POSTS_FAILURE",
      message: error.message,
      response: error.response.data,
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

    await axios.post(`${API_URL}/votes/post`, { data: voteObj })

    dispatch({ type: "POST_VOTE_SUCCESS", payload: voteObj })
  } catch (error) {
    console.log(error)
    dispatch({
      type: "POST_VOTE_FAILURE",
      message: error.message,
      response: error.response.data,
    })
  }
}

export const createPost =
  ({ postType, title, body, authorId, subredditId, subredditName }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "CREATE_POST_REQUEST" })

      let dateNow = formatISO9075(new Date())
      console.log("POST DATE NOW", dateNow)

      // title = escapeHTML(title)
      // body = escapeHTML(body)

      const createdPost = {
        postType,
        title,
        body,
        authorId,
        subredditId,
        subredditName,
      }

      const response = await axios.post(`${API_URL}/posts`, createdPost)

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
        message: error.message,
        response: error.response.data,
      })
    }
  }
