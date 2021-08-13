export const subredditsReducer = (state = [], action) => {

  console.log(action)
  switch (action.type) {
    case "CREATE_SUBREDDIT_SUCCESS": {
      return [...state, action.payload];
    }

    case "GET_SUBREDDITS_SUCCESS": {
      return action.payload;
    }

    case "DELETE_SUBREDDIT_SUCCESS": {
      console.log(action.payload)
      return state.filter(subreddit =>
        subreddit.id !== action.payload
      )
    }

    default:
      return state;
  }
};
