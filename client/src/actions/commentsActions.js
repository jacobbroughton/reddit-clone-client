import axios from "../axios-config"
import { getApiUrl } from "../actions/nodeEnvActions"

const API_URL = getApiUrl()

export const addComment = ({ 
  body,
  emoji,
  author_id,
  post_id,
  parent_comment,
  username
 }) => async (dispatch, action) => {
  try {
    dispatch({ type: "ADD_COMMENT_REQUEST" })


    let comment = {
      body,
      emoji,
      author_id,
      post_id,
      parent_comment,
      username
    }    
    
    let dateISOString = new Date().toISOString()
    let dateNow = `${dateISOString.substr(0, 10)} ${dateISOString.substr(11, 8)}`

    const response = await axios.post(`${API_URL}/comments`, comment)

    comment = {
      ...comment,
      id: response.data.insertId,
      threadToggle: true,
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


export const commentThreadToggle = (id, threadToggle) => async (dispatch) => {
  console.log(id)
  console.log(threadToggle)
  dispatch({
    type: "TOGGLE_COMMENT_THREAD",
    payload: { idForThreadToggle: id, threadToggle }
  })
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
    console.log(response.data[0])

    let commentsArr = response.data.map(comment => {
      return {...comment, threadToggle: true}}
    )

    console.log(commentsArr[0])
    
    
    dispatch({ type: "GET_COMMENTS_SUCCESS", payload: commentsArr })

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