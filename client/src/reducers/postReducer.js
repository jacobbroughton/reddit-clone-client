
export const postReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_POST_SUCCESS":
      return action.payload

    case "SET_POST_SUCCESS":
      return action.payload

    case "EDIT_POST":
      const { id, updates } = action
      
      return {
        ...state,
        body: updates.body
      }

    case "DELETE_POST_SUCCESS": 
      const { idForDelete } = action.payload

      // Need to figure out how keep the stuff there on refresh after deletion, but with
      // [deleted] in the spots

      return {
        ...state,
        title: "[DELETED]",
        body: "[DELETED]",
        username: "[DELETED]",
        status: "[DELETED]"
      }
      
    default :
      return state
  }
}
