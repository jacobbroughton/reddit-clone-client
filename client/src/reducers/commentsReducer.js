export const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_COMMENTS_SUCCESS" :
      return action.payload

    case "ADD_COMMENT_SUCCESS" :
      return [action.payload, ...state]

    case "RESET_COMMENTS" :
      return state = []
      
    default:
      return state
  }
}