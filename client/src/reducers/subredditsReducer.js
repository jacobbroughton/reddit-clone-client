import axios from "../axios-config.js"
import moment from "moment"


const API_URL = "http://localhost:5000"


export const subredditsReducer = (state = [], action) => {
  switch(action.type) {
    case "CREATE_SUBREDDIT_REQUEST" :
      return {
        ...state
      }
    case "CREATE_SUBREDDIT_SUCCESS" :
      return {
        ...state,
        subreddits: [...state, action.payload]
      }
    default: 
    return state
  }
}

export const createSubreddit = (name, description) => async (dispatch, useState) => {
  try {
    dispatch({ type: "CREATE_SUBREDDIT_REQUEST" })

    let dateNow = moment().format("MMMM Do YYYY");

    let newSubreddit = {
      name, 
      description,
      createdAt: dateNow
    }

    axios.post(`${API_URL}/subreddits/create`, newSubreddit)
    .then(res => {
      dispatch({ type: "CREATE_SUBREDDITS_SUCCESS", payload: newSubreddit })
    }) 

  } catch (error) {
    dispatch({ type: "CREATE_SUBREDDIT_FAILURE" })
    console.log(error)
  }
}