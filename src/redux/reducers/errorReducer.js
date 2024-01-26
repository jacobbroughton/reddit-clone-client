export const errorReducer = (state = [], action) => {
  switch (action.type) {
    case "REMOVE_ERROR": {

      return state.filter(
        (errorItem) => errorItem.itemIndex !== action.payload
      )
    }
    default: {
      const { type, message } = action
      const matches = /(.*)_(REQUEST|FAILURE)/.exec(type)

      if (!matches) {
        return state
      }

      const [, requestName, requestStatus] = matches

      if (requestStatus === "FAILURE") {
        state.push({ itemIndex: state.length, requestName, message })
      }

      return [
        ...state,
      ]
    }
  }
}

export const removeError = (index) => (dispatch) => {
  setTimeout(() => dispatch({ type: "REMOVE_ERROR", payload: index }), 4000)
}
