export const subredditReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_CURRENT_SUBREDDIT_SUCCESS" :
      console.log("Type of current subreddit: ", typeof(action.payload))
      return action.payload
    default :
      return state
  }
}