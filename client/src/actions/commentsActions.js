import axios from "../axios-config"

const API_URL = "http://localhost:5000"

export const addComment = ({ 
  body,
  author_id,
  postId,
  parentComment,
  username
 }) => async (dispatch, action) => {
  try {
    dispatch({ type: "ADD_COMMENT_REQUEST" })


    let comment = {
      body,
      author_id,
      postId,
      parentComment,
      username
    }    
    
    let dateISOString = new Date().toISOString()
    let dateNow = `${dateISOString.substr(0, 10)} ${dateISOString.substr(11, 8)}`

    const response = await axios.post(`${API_URL}/comments`, comment)


    comment = {
      ...comment,
      id: response.data.insertId,
      created_at: dateNow,
      updated_at: dateNow 
    }

    dispatch({ type: "ADD_COMMENT_SUCCESS", payload: comment })

  } catch (error) {
    dispatch({
      type: "ADD_COMMENT_FAILURE",
      message: error.message,
      response: error.response
    })
  }
}


export const editComment = (id, updates) => ({
  type: "EDIT_COMMENT",
  id,
  updates
})


export const startEditComment = ({ id, body }) => async (dispatch, action) => {
  try {
    dispatch({ type: "EDIT_COMMENT_REQUEST" })

    // API request
    await axios.put(`${API_URL}/comments/${id}`, { body })

    dispatch(editComment(id, { body }))

    dispatch({ type: "EDIT_COMMENT_SUCCESS" })
  } catch (error) {
    dispatch({
      type: "EDIT_COMMENT_FAILURE",
      response: error.response,
      message: error.message
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


export const deleteComment = (idForDelete) => async (dispatch, action) => {
  try{
    dispatch({ type: "DELETE_COMMENT_REQUEST" })

    const response = await axios.delete(`${API_URL}/comments`, { data: { idForDelete } })

    console.log(response)

    dispatch({ type: "DELETE_COMMENT_SUCCESS" , payload: { idForDelete }})
  } catch (error) {
    dispatch({
      type: "DELETE_COMMENT_FAILURE",
      response: error.response,
      message: error.message
    })
  }

}



export const resetComments = () => async (dispatch, action) => {
  dispatch({ type: "RESET_COMMENTS" })
}