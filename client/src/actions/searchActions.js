import axios from "axios"

export const search = (userId, subredditName, searchValue) => async (dispatch, getState) => {
  try {
    dispatch({ type: "SEARCH_REQUEST" })

    console.log(getState())

    console.log(userId, subredditName, searchValue)

    const response = await axios.get(`/search${userId ? `?userId=${userId}` : ''}${subredditName ? `${!userId ? '?' : '&'}subredditName=${subredditName}` : ''}${!userId && !subredditName ? '?' : '&'}q=${searchValue}`)
    
    // dispatch({ type:  "SEARCH_SUCCESS", payload: response.data })
    dispatch({ type: "GET_POSTS_SUCCESS", payload: response.data })

  } catch (error) {
    console.log(error)
  }
}