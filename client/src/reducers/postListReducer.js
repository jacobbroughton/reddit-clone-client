import axios from "axios"
import moment from "moment"
import history from "../history"

export const postListReducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE_POST_SUCCESS": 
      return [...state, action.payload]

    case "GET_ALL_POSTS_SUCCESS" :
      return action.payload

    case "GET_SUBREDDIT_POSTS_SUCCESS" :
        return action.payload

    case "EDIT_POST" : 
    console.log( action.id)
      // return state.map((post) => post.id === action.id ? )
    default:
      return state
  }
}