import axios from "axios"
import moment from "moment"

export const PostsReducer = (state = [], action) => {
  switch (action.type) {
    default:
      return state
  }
}

const API_URL = "http://localhost:5000"


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
    

    axios.post(`${API_URL}/posts`, createdPost)

  } catch (error) {
    dispatch({ 
      type: "CREATE_POST_FAILURE",
      message: error.message,
      response: error.response
    })
  }
}