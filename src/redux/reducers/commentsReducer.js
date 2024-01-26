export const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_COMMENTS_SUCCESS": {
      return action.payload
    }

    case "ADD_COMMENT_SUCCESS": {
      return [action.payload, ...state]
    }

    case "RESET_COMMENTS": {
      return (state = [])
    }

    case "EDIT_COMMENT": {
      const { id, updates } = action
      return state.map((comment) =>
        comment.id === id ? { ...comment, ...updates } : comment
      )
    }

    case "DELETE_COMMENT_SUCCESS": {
      const { id } = action.payload
      console.log(id)
      console.log(state.filter((comment) => comment.id !== id))
      return state.filter((comment) => comment.id !== id)
    }

    case "TOGGLE_COMMENT_THREAD": {
      const { id, threadToggle } = action.payload
      console.log(id, threadToggle)

      console.log(
        state.map((comment) =>
          comment.id === id ? { ...comment, threadToggle } : comment
        )
      )
      return state.map((comment) =>
        comment.id === id ? { ...comment, threadToggle } : comment
      )
    }

    case "COMMENT_VOTE_SUCCESS": {
      const { commentId, value } = action.payload

      const voteCalc = (comment) => {
        switch (value) {
          case 1: {
            if (comment.has_voted === 1) return comment.vote_count - 1
            if (comment.has_voted === -1) return comment.vote_count + 2
            return comment.vote_count + 1
          }
          case -1: {
            if (comment.has_voted === -1) return comment.vote_count + 1
            if (comment.has_voted === 1) return comment.vote_count - 2
            return comment.vote_count - 1
          }
          default: {
            return comment.vote_count
          }
        }
      }

      return state.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              vote_count: voteCalc(comment),
              has_voted: comment.has_voted === value ? null : value,
              vote_value: comment.has_voted,
            }
          : comment
      )
    }

    default:
      return state
  }
}
