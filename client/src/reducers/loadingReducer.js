export const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_LOADING" :
      return state = action.payload
    default :
      return state
  }
}