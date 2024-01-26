export const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case "GET_POSTS_REQUEST":
      return (state = true)
    case "GET_POSTS_SUCCESS":
      return (state = false)
    case "GET_COMMENTS_REQUEST":
      return (state = true)
    case "GET_COMMENTS_SUCCESS":
      return (state = false)
    case "GET_POST_REQUEST":
      return (state = true)
    case "LOGIN_REQUEST":
      return (state = true)
    // case "LOGIN_SUCCESS" :
    //   return state = false
    case "GET_POST_SUCCESS":
      return (state = false)
    default:
      return state
  }
}
