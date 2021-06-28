
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

    default :
      return state
  }
}
