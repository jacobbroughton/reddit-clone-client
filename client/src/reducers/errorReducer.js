export const errorReducer = (state = [], action) => {
  switch (action.type) {
    case "REMOVE_ERROR": {

      let clonedErrorArray = state.filter(
        (errorItem) => errorItem.itemIndex !== action.payload
      )

      return clonedErrorArray
    }
    default: {
      const { type, response } = action
      const matches = /(.*)_(REQUEST|FAILURE)/.exec(type)

      if (!matches) {
        return state
      }

      const [, requestName, requestStatus] = matches

      if (requestStatus === "FAILURE") {
        state.push({ itemIndex: state.length, requestName, response })
      }

      return [
        ...state,
        // [requestName]: requestStatus === 'FAILURE' ? response : {}
        // requestStatus === 'FAILURE' && {requestName, response}
      ]
    }
  }
}

export const removeError = (index) => (dispatch) => {
  setTimeout(() => dispatch({ type: "REMOVE_ERROR", payload: index }), 4000)
}
