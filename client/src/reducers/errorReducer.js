export const errorReducer = (state = [], action) => {
  switch (action.type) {
    case "REMOVE_ERROR": {
      // // return state.filter((errorItem, errorIndex) => errorIndex !== action.payload)
      let clonedErrorArray = state.filter(
        (errorItem) => errorItem.itemIndex !== action.payload
      )
      // // setTimeout(() => {
      // //   return state.splice(action.payload,  1)
      // // }, 5000)

      // return [
      //   ...state.slice(0, action.payload),
      //   ...state.slice(action.payload + 1)
      // ]
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
