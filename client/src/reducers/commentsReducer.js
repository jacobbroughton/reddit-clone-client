export const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_COMMENTS_SUCCESS" :
      return action.payload

    case "ADD_COMMENT_SUCCESS" :
      return [action.payload, ...state]

    case "RESET_COMMENTS" :
      return state = []

    case "EDIT_COMMENT": 
      const { id, updates } = action
      
      return state.map((comment) => comment.id === id ? {...comment, ...updates} : comment)
      
    default:
      return state
  }
}