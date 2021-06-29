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
    
    case "DELETE_COMMENT_SUCCESS": 
      const { idForDelete } = action.payload
      console.log(idForDelete)
      console.log(state.filter(comment => comment.id !== idForDelete))
      return state.filter(comment => comment.id !== idForDelete)

    default:
      return state
  }
}