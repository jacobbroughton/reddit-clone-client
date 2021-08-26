import axios from "../axios-config";
import { getApiUrl } from "../actions/nodeEnvActions";

const API_URL = getApiUrl();

export const getPost = (postId, userId) => async (dispatch) => {
  try {
    dispatch({ type: "GET_POST_REQUEST" });

    const response = await axios.get(`${API_URL}/posts/single/${postId}/${userId ? userId : ''}`);

    dispatch({ type: "GET_POST_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "GET_POST_FAILURE",
      message: error.message,
      response: error.response,
    });
  }
};

export const setPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: "SET_POST_REQUEST" });

    // const response = await axios.get(`${API_URL}/posts/single/${postId}`)
    console.log(post);
    dispatch({ type: "SET_POST_SUCCESS", payload: post });
  } catch (error) {
    dispatch({
      type: "SET_POST_FAILURE",
      message: error.message,
      response: error.response,
    });
  }
};

export const handleSinglePostVote = (userId, postId, value) => async (dispatch) => {
  try {
    dispatch({ type: "SINGLE_POST_VOTE_REQUEST" })

    let voteObj = {
      userId,
      postId,
      value
    }

    console.log(value)

    await axios.post(`${API_URL}/votes/post`, { data: voteObj })

    dispatch({ type: "SINGLEPOST_VOTE_SUCCESS" , payload: voteObj})
  } catch (error) {
    console.log(error)
    dispatch({ type: "SINGLE_POST_VOTE_FAILURE" })
  }
}

export const editPost = (id, updates) => ({
  type: "EDIT_POST",
  id,
  updates,
});

export const startEditPost = ({ id, body }) => async (dispatch) => {
  try {
    dispatch({ type: "EDIT_POST_REQUEST" });

    await axios.put(`${API_URL}/posts/single/${id}`, { body });

    dispatch(editPost(id, { body }));

    dispatch({ type: "EDIT_POST_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "EDIT_POST_FAILURE",
      message: error.message,
      response: error.response,
    });
  }
};

export const deletePost = (post, id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_POST_REQUEST" });

    await axios.delete(`${API_URL}/posts`, { data: { id } });

    dispatch({ type: "DELETE_POST_SUCCESS", payload: { id } });
  } catch (error) {
    dispatch({
      type: "DELETE_POST_FAILURE",
      message: error.message,
      response: error.response,
    });
  }
};
