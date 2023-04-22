import { loadState } from "../utilities/localStorage"

export const themeReducer = (
  state = loadState("themeState") || false,
  action
) => {

  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return !state
    default: {
      return state
    }
  }
}

export const toggleTheme = () => async (dispatch) => {
  dispatch({ type: "TOGGLE_DARK_MODE" })
}
