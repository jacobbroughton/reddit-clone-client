import axios from "../axios-config"

const API_URL = "http://localhost:5000"

export const getPost = (postId) => async (dispatch, getState) => {
  try{
    dispatch({ type: "GET_POST_REQUEST" })

    const response = await axios.get(`${API_URL}/posts/single/${postId}`)

    dispatch({ type: "GET_POST_SUCCESS", payload: response.data })

  } catch (error) {
    dispatch({
      type: "GET_POST_FAILURE",
      message: error.message,
      response: error.response
    })
  }
}

export const setPost = (post) => async (dispatch, getState) => {
  try{
    dispatch({ type: "SET_POST_REQUEST" })

    // const response = await axios.get(`${API_URL}/posts/single/${postId}`)

    dispatch({ type: "SET_POST_SUCCESS", payload: post })

  } catch (error) {
    dispatch({
      type: "SET_POST_FAILURE",
      message: error.message,
      response: error.response
    })
  }
}

export const editPost = (id, updates) => ({
  type: "EDIT_POST",
  id,
  updates
})

export const startEditPost = ({ id, body }) => async (dispatch, getState) => {
  try {
    dispatch({ type: "EDIT_POST_REQUEST" })

    await axios.put(`${API_URL}/posts/single/${id}`, { body })

  
    dispatch(editPost(id, { body }))

    dispatch({ type: "EDIT_POST_SUCCESS" })

  } catch (error) {
    dispatch({
      type: "EDIT_POST_FAILURE",
      message: error.message,
      response: error.response
    })
  }
}