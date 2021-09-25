import axios from "axios"

export const search = (userId, subredditName, searchValue) => async (dispatch) => {
  try {
    dispatch({ type: "GET_POSTS_REQUEST" })

    const response = await axios.get(`/search${userId ? `?userId=${userId}` : ''}${subredditName ? `${!userId ? '?' : '&'}subredditName=${subredditName}` : ''}${!userId && !subredditName ? '?' : '&'}q=${searchValue}`)
    
    dispatch({ type: "GET_POSTS_SUCCESS", payload: response.data })

  } catch (error) {
    console.log(error)
  }
}