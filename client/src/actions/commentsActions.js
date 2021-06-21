import axios from "../axios-config"

const API_URL = "http://localhost:5000"

export const addComment = ({ 
  body,
  authorId,
  postId,
  parentComment,
  username,
  createdAt,
  updatedAt
 }) => async (dispatch, action) => {
  try {
    dispatch({ type: "ADD_COMMENT_REQUEST" })

    const comment = {
      body,
      authorId,
      postId,
      parentComment,
      username,
      createdAt,
      updatedAt
    }

    const response = await axios.post(`${API_URL}/comments`, comment)

    comment.id = response.data.insertId

    dispatch({ type: "ADD_COMMENT_SUCCESS", payload: comment })

  } catch (error) {
    dispatch({
      type: "ADD_COMMENT_FAILURE",
      message: error.message,
      response: error.response
    })
  }
}

export const getComments = ( postId ) => async (dispatch, action) => {
  try {
    dispatch({ type: "GET_COMMENTS_REQUEST" })

    const response = await axios.get(`${API_URL}/comments/${postId}`)
    
    dispatch({ type: "GET_COMMENTS_SUCCESS", payload: response.data })

  } catch (error) {
    dispatch({ 
      type: "GET_COMMENTS_FAILURE",
      message: error.message,
      response: error.response
    })
  }
}

export const resetComments = () => async (dispatch, action) => {
  dispatch({ type: "RESET_COMMENTS" })
}