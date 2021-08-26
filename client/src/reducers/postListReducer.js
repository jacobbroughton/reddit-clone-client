export const postListReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_POSTS_SUCCESS": {
      return action.payload;
    }

    case "CREATE_POST_SUCCESS": {
      return [...state, action.payload];
    }

    case "GET_SUBREDDIT_POSTS_SUCCESS": {
      return action.payload;
    }

    case "DELETE_POST_SUCCESS": {
      const { id } = action.payload;

      return state.map((post) =>
        post.id === id
          ? {
              ...post,
              title: "[DELETED]",
              body: "[DELETED]",
              username: "[DELETED]",
            }
          : post
      );
    }

    case "EDIT_POST": {
      const { id, updates } = action;

      if (state) {
        return state.map((post) =>
          post.id === id
            ? {
                ...post,
                body: updates.body,
              }
            : post
        );
      }
      break;
    }

    case "POST_VOTE_SUCCESS": {
      const { postId, value } = action.payload;

      const voteCalc = (post) => {
        console.log(post);
        switch (value) {
          case 1: {
            if (post.has_voted === 1) return post.vote_count - 1;
            if (post.has_voted === -1) return post.vote_count + 2;
            return post.vote_count + 1;
          }
          case -1: {
            if (post.has_voted === -1) return post.vote_count + 1;
            if (post.has_voted === 1) return post.vote_count - 2;
            return post.vote_count - 1;
          }
          default: {
            return post.vote_count;
          }
        }
      };

      return state.map((post) =>
        post.id === postId
          ? {
              ...post,
              vote_count: voteCalc(post),
              has_voted: post.has_voted === value ? null : value,
              vote_value: post.has_voted,
            }
          : post
      );
    }

    default:
      return state;
  }
};
