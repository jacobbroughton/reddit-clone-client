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


    case "TOGGLE_COMMENT_THREAD":
      const { idForThreadToggle, threadToggle } = action.payload
      console.log(idForThreadToggle, threadToggle)

      console.log(state.map(comment => comment.id === idForThreadToggle ? {...comment, threadToggle} : comment))
      return state.map(comment => comment.id === idForThreadToggle ? {...comment, threadToggle} : comment)

    default:
      return state
  }
}