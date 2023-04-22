import axios from "axios"

export const search =
  (userId, subredditName, searchValue) => async (dispatch) => {
    try {
      dispatch({ type: "SEARCH_REQUEST" })

      const response = await axios.get(
        `/search${userId ? `?userId=${userId}` : ""}${
          subredditName
            ? `${!userId ? "?" : "&"}subredditName=${subredditName}`
            : ""
        }${!userId && !subredditName ? "?" : "&"}q=${searchValue}`
      )

      dispatch({ type: "GET_POSTS_SUCCESS", payload: response.data })
    } catch (error) {
      console.log(error)
      dispatch({
        type: "SEARCH_FAILURE",
        message: error.message,
        response: error.response.data,
      })
    }
  }
