export const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_COMMENTS_SUCCESS": {
      return action.payload;
    }

    case "ADD_COMMENT_SUCCESS": {
      return [action.payload, ...state];
    }

    case "RESET_COMMENTS": {
      return (state = []);
    }

    case "EDIT_COMMENT": {
      const { id, updates } = action;
      return state.map((comment) =>
        comment.id === id ? { ...comment, ...updates } : comment
      );
    }

    case "DELETE_COMMENT_SUCCESS": {
      const { id } = action.payload;
      console.log(id);
      console.log(state.filter((comment) => comment.id !== id));
      return state.filter((comment) => comment.id !== id);
    }

    case "TOGGLE_COMMENT_THREAD": {
      const { id, threadToggle } = action.payload;
      console.log(id, threadToggle);

      console.log(
        state.map((comment) =>
          comment.id === id
            ? { ...comment, threadToggle }
            : comment
        )
      );
      return state.map((comment) =>
        comment.id === id
          ? { ...comment, threadToggle }
          : comment
      );
    }

    default:
      return state;
  }
};
