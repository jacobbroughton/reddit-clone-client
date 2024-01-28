import axios from "../../utils/axios-config"
import { getApiUrl } from "../../utils/getUrl"
import he from "he"
// import escapeHTML from "../utils/escapeHTML"

const API_URL = getApiUrl()

export const getPost = (postId, userId) => async (dispatch) => {
  try {
    dispatch({ type: "GET_POST_REQUEST" })

    const response = await axios.get(
      `${API_URL}/posts/single/${postId}/${userId ? userId : ""}`
    )

    if (response.status !== 200) {
      throw response.data.message
    }

    let post = response.data

    post = {
      ...post,
      title: he.decode(post.title),
      body: he.decode(post.body),
    }

    dispatch({ type: "GET_POST_SUCCESS", payload: post })
  } catch (error) {
    dispatch({
      type: "GET_POST_FAILURE",
      message: error.response.data.message,
      
    })
  }
}

export const setPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: "SET_POST_REQUEST" })

    console.log(post)

    if (post) {
      post = {
        ...post,
        title: he.decode(post.title),
        body: he.decode(post.body),
      }
    }

    dispatch({ type: "SET_POST_SUCCESS", payload: post })
  } catch (error) {
    dispatch({
      type: "SET_POST_FAILURE",
      message: error.response.data.message,
      
    })
  }
}

export const handleSinglePostVote =
  (userId, postId, value) => async (dispatch) => {
    try {
      dispatch({ type: "SINGLE_POST_VOTE_REQUEST" })

      let voteObj = {
        userId,
        postId,
        value,
      }

      console.log(value)

      const response = await axios.post(`${API_URL}/votes/post`, { data: voteObj })

      if (response.status !== 200) {
        throw response.data.message
      }

      dispatch({ type: "SINGLEPOST_VOTE_SUCCESS", payload: voteObj })
    } catch (error) {
      console.log(error)
      dispatch({ type: "SINGLE_POST_VOTE_FAILURE" })
    }
  }

export const editPost = (id, updates) => ({
  type: "EDIT_POST",
  id,
  updates,
})

export const startEditPost =
  ({ id, body }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "EDIT_POST_REQUEST" })

      const response = await axios.put(`${API_URL}/posts/single/${id}`, { body })

      if (response.status !== 200) {
        throw response.data.message
      }

      dispatch(editPost(id, { body }))

      dispatch({ type: "EDIT_POST_SUCCESS" })
    } catch (error) {
      dispatch({
        type: "EDIT_POST_FAILURE",
        message: error.response.data.message,
        
      })
    }
  }

export const deletePost = (post, id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_POST_REQUEST" })

    const response = await axios.delete(`${API_URL}/posts`, { data: { id } })

    if (response.status !== 200) {
      throw response.data.message
    }

    dispatch({ type: "DELETE_POST_SUCCESS", payload: { id } })
  } catch (error) {
    dispatch({
      type: "DELETE_POST_FAILURE",
      message: error.response.data.message,
      
    })
  }
}
