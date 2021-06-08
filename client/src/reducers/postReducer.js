import axios from "../axios-config"

const API_URL = "http://localhost:5000"

export const postReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_POST_SUCCESS":
      return state
    default :
      return state
  }
}

export const getPost = (postId) => async (dispatch, getState) => {
  try{
    dispatch({ type: "GET_POST_REQUEST" })

    const response = await axios.get(`${API_URL}/posts/single/${postId}`)

    console.log(response)

  } catch (error) {
    dispatch({
      type: "GET_POST_FAILURE",
      message: error.message,
      response: error.response
    })
  }
}