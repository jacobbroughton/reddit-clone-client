import axios from "../axios-config"
import { formatISO9075 } from "date-fns"
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

const API_URL = "http://localhost:5000"

export const addComment = ({ 
  body,
  authorId,
  postId,
  parentComment,
  username
 }) => async (dispatch, action) => {
  try {
    dispatch({ type: "ADD_COMMENT_REQUEST" })


    let comment = {
      body,
      authorId,
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