import axios from "../axios-config";
import { getApiUrl } from "../actions/nodeEnvActions";

const API_URL = getApiUrl();

export const addComment = ({
  body,
  author_id,
  post_id,
  parent_comment,
  username,
}) => async (dispatch, action) => {
  try {
    dispatch({ type: "ADD_COMMENT_REQUEST" });

    let comment = {
      body,
      author_id,
      post_id,
      parent_comment,
      username,
    };

    let dateISOString = new Date().toISOString();
    let dateNow = `${dateISOString.substr(0, 10)} ${dateISOString.substr(
      11,
      8
    )}`;

    const response = await axios.post(`${API_URL}/comments`, comment);

    comment = {
      ...comment,
      id: response.data.insertId,
      threadToggle: true,
      created_at: dateNow,
      updated_at: dateNow,
    };

    dispatch({ type: "ADD_COMMENT_SUCCESS", payload: comment });
  } catch (error) {
    dispatch({
      type: "ADD_COMMENT_FAILURE",
      message: error.message,
      response: error.response,
    });
  }
};

export const commentThreadToggle = (id, threadToggle) => async (dispatch) => {
  dispatch({
    type: "TOGGLE_COMMENT_THREAD",
    payload: { id, threadToggle },
  });
};

export const handleVote = (userId, commentId, value) => async (dispatch, getState) => {
  try {
    dispatch({ type: "COMMENT_VOTE_REQUEST" })

    let voteObj = {
      userId,
      commentId,
      value
    }

    console.log(voteObj.value)

    await axios.post(`${API_URL}/votes/comment`, { data: voteObj })

    dispatch({ type: "COMMENT_VOTE_SUCCESS" , payload: voteObj})
  } catch (error) {
    console.log(error)
    dispatch({ type: "COMMENT_VOTE_FAILURE" })
  }
}

export const editComment = (id, updates) => ({
  type: "EDIT_COMMENT",
  id,
  updates,
});

export const startEditComment = ({ id, body }) => async (dispatch, action) => {
  try {
    dispatch({ type: "EDIT_COMMENT_REQUEST" });

    // API request
    await axios.put(`${API_URL}/comments/${id}`, { body });

    dispatch(editComment(id, { body }));

    dispatch({ type: "EDIT_COMMENT_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "EDIT_COMMENT_FAILURE",
      response: error.response,
      message: error.message,
    });
  }
};

export const getComments = (postId, userId) => async (dispatch, action) => {
  try {
    dispatch({ type: "GET_COMMENTS_REQUEST" });

    const response = await axios.get(`${API_URL}/comments/${postId}?userId=${userId ? userId : ''}`);

    let commentsArr = response.data.map((comment) => {
      return { ...comment, threadToggle: true };
    });

    dispatch({ type: "GET_COMMENTS_SUCCESS", payload: commentsArr });
  } catch (error) {
    dispatch({
      type: "GET_COMMENTS_FAILURE",
      message: error.message,
      response: error.response,
    });
  }
};

export const deleteComment = (id) => async (dispatch, action) => {
  try {
    dispatch({ type: "DELETE_COMMENT_REQUEST" });

    const response = await axios.delete(`${API_URL}/comments`, {
      data: { id },
    });

    console.log(response);

    dispatch({ type: "DELETE_COMMENT_SUCCESS", payload: { id } });
  } catch (error) {
    dispatch({
      type: "DELETE_COMMENT_FAILURE",
      response: error.response,
      message: error.message,
    });
  }
};

export const resetComments = () => async (dispatch, action) => {
  dispatch({ type: "RESET_COMMENTS" });
};
