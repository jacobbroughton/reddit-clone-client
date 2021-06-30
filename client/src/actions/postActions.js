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
    console.log(post)
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
  idForEdit: id,
  updates
})


export const startEditPost = ({ idForEdit, body }) => async (dispatch, getState) => {
  try {
    dispatch({ type: "EDIT_POST_REQUEST" })

    await axios.put(`${API_URL}/posts/single/${idForEdit}`, { body })

  
    dispatch(editPost(idForEdit, { body }))

    dispatch({ type: "EDIT_POST_SUCCESS" })

  } catch (error) {
    dispatch({
      type: "EDIT_POST_FAILURE",
      message: error.message,
      response: error.response
    })
  }
}


export const deletePost = (post, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "DELETE_POST_REQUEST" })

    await axios.delete(`${API_URL}/posts`, { data: { id } })

    dispatch({ type: "DELETE_POST_SUCCESS" , payload: { id }})

  } catch (error) {
    dispatch({
      type: "DELETE_POST_FAILURE",
      message: error.message,
      response: error.response
    })
  }
}