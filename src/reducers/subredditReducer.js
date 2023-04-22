export const subredditReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_CURRENT_SUBREDDIT_SUCCESS": {
      return action.payload
    }
    default:
      return state
  }
}
