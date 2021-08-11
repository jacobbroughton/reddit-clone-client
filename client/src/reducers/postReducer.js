export const postReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_POST_SUCCESS": {
      return action.payload;
    }

    case "SET_POST_SUCCESS": {
      return action.payload;
    }

    case "EDIT_POST": {
      const { id, updates } = action;

      return {
        ...state,
        body: updates.body,
      };
    }

    case "POST_VOTE_SUCCESS": {
      const { userId, postId, value } = action.payload

      const voteCalc = (post) => {
        console.log(post)
        console.log(state)
        switch(value) {
          case 1 : {
            if(post.has_voted === 1) return post.vote_count - 1
            if(post.has_voted === -1) return post.vote_count + 2
            return post.vote_count + 1
          }
          case -1 : {
            if(post.has_voted === -1) return post.vote_count + 1
            if(post.has_voted === 1) return post.vote_count - 2
            return post.vote_count - 1
          }
          default : {
            return post.vote_count;
          }
        }
      }

      return { 
        ...state,  
        vote_count: voteCalc(state),
        has_voted: state.has_voted === value ? null : value,
        vote_value: state.has_voted
      }
    }

    case "DELETE_POST_SUCCESS": {
      return {
        ...state,
        title: "[DELETED]",
        body: "[DELETED]",
        username: "[DELETED]",
        status: "[DELETED]",
      };
    }

    default:
      return state;
  }
};
