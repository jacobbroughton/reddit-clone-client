import axios from "../axios-config"

const API_URL = "http://localhost:5000"

export const postReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_POST_SUCCESS":
      return action.payload

    case "SET_POST_SUCCESS":
      return action.payload

    case "EDIT_POST":
      const { id, updates } = action
      console.log(state)
      
      return {
        ...state,
        // posts: state.posts.map(post => post.id === )
      }

    default :
      return state
  }
}
