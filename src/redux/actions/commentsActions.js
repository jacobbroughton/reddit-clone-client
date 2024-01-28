import axios from "../../utils/axios-config"
import { getApiUrl } from "../../utils/getUrl"
import he from "he"

const API_URL = getApiUrl()

export const addComment =
  ({ body, author_id, post_id, parent_comment, username, profile_picture }) =>
    async (dispatch) => {
      try {
        dispatch({ type: "ADD_COMMENT_REQUEST" })

        let comment = {
          body,
          author_id,
          post_id,
          parent_comment,
          username,
          profile_picture,
        }

        let dateISOString = new Date().toISOString()
        let dateNow = `${dateISOString.substr(0, 10)} ${dateISOString.substr(
          11,
          8
        )}`

        body = he.encode(body)

        const response = await axios.post(`${API_URL}/comments`, comment)

        if (response.status !== 200) {
          throw response.data.message
        }

        comment = {
          ...comment,
          id: response.data.insertId,
          threadToggle: true,
          created_at: dateNow,
          updated_at: dateNow,
          vote_count: 0,
        }

        dispatch({ type: "ADD_COMMENT_SUCCESS", payload: comment })
      } catch (error) {
        dispatch({
          type: "ADD_COMMENT_FAILURE",
          message: error.response.data.message,

        })
      }
    }

export const commentThreadToggle = (id, threadToggle) => async (dispatch) => {
  dispatch({
    type: "TOGGLE_COMMENT_THREAD",
    payload: { id, threadToggle },
  })
}

export const handleVote = (userId, commentId, value) => async (dispatch) => {
  try {
    dispatch({ type: "COMMENT_VOTE_REQUEST" })

    let voteObj = {
      userId,
      commentId,
      value,
    }

    const response = await axios.post(`${API_URL}/votes/comment`, { data: voteObj })

    if (response.status !== 200) {
      throw response.data.message
    }

    dispatch({ type: "COMMENT_VOTE_SUCCESS", payload: voteObj })
  } catch (error) {
    dispatch({
      type: "COMMENT_VOTE_FAILURE",
      message: error.response.data.message,

    })
  }
}

export const editComment = (id, updates) => ({
  type: "EDIT_COMMENT",
  id,
  updates,
})

export const startEditComment =
  ({ id, body }) =>
    async (dispatch) => {
      try {
        dispatch({ type: "EDIT_COMMENT_REQUEST" })

        // API request
        const response = await axios.put(`${API_URL}/comments/${id}`, { body })

        if (response.status !== 200) {
          throw response.data.message
        }

        body = he.encode(body)

        dispatch(editComment(id, { body }))

        dispatch({ type: "EDIT_COMMENT_SUCCESS" })
      } catch (error) {
        dispatch({
          type: "EDIT_COMMENT_FAILURE",

          message: error.response.data.message,
        })
      }
    }

export const getComments = (postId, userId) => async (dispatch) => {
  try {
    dispatch({ type: "GET_COMMENTS_REQUEST" })

    const response = await axios.get(
      `${API_URL}/comments/${postId}${userId ? `?userId=${userId}` : ""}`
    )

    if (response.status !== 200) {
      throw response.data.message
    }

    let commentsArr = response.data.map((comment) => {
      return { ...comment, threadToggle: true }
    })

    dispatch({ type: "GET_COMMENTS_SUCCESS", payload: commentsArr })
  } catch (error) {
    dispatch({
      type: "GET_COMMENTS_FAILURE",
      message: error.response.data.message,

    })
  }
}

export const deleteComment = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_COMMENT_REQUEST" })

    const response = await axios.delete(`${API_URL}/comments`, {
      data: { id },
    })

    if (response.status !== 200) {
      throw response.data.message
    }

    dispatch({ type: "DELETE_COMMENT_SUCCESS", payload: { id } })
  } catch (error) {
    dispatch({
      type: "DELETE_COMMENT_FAILURE",

      message: error.response.data.message,
    })
  }
}

export const resetComments = () => async (dispatch) => {
  dispatch({ type: "RESET_COMMENTS" })
}
