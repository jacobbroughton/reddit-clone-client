export const postListReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_POSTS_SUCCESS" :
      return action.payload
      
    case "CREATE_POST_SUCCESS": 
      return [...state, action.payload]

    case "GET_SUBREDDIT_POSTS_SUCCESS" :
        return action.payload

    case "DELETE_POST_SUCCESS": 
      
      const { id } = action.payload
      console.log(id)

      return state.map(post => post.id === id ?  {
        ...post,
        title: '[DELETED]',
        body: '[DELETED]',
        username: '[DELETED]'
      } : post  )
        
    default:
      return state
  }
}