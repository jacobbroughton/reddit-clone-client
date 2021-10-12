export const errorReducer = (state = [], action) => {

  switch(action.type) {
    case "REMOVE_ERROR": {
      return state.filter((errorItem, errorIndex) => errorIndex !== action.payload)
    }
    default: {
      const { type, response } = action
      const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);
    
      if(!matches) {
        return state
      }
    
      const [
        , requestName, 
        requestStatus] = matches
    
      if(requestStatus === 'FAILURE') {
        state.push({requestName, response})
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
  dispatch({ type: "REMOVE_ERROR", payload: index })
}