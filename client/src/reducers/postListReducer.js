export const postListReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_POSTS_SUCCESS" :
      return action.payload
      
    case "CREATE_POST_SUCCESS": 
      return [...state, action.payload]

    case "GET_SUBREDDIT_POSTS_SUCCESS" :
        return action.payload

    case "EDIT_POST" : 
    console.log(action.id)
      // return state.map((post) => post.id === action.id ? )
      return state
    default:
      return state
  }
}