export const searchPostsReducer = (state = null, action) => {
  switch (action.type) {
    case "SEARCH_SUCCESS": {
      console.log(action.payload)

      return state
    }

    default: {
      return state
    }
  }
}
