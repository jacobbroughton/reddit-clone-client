// Saves the state to localStorage
export const saveState = (state, stateName) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(stateName, serializedState)
  } catch {
    // ignore write errors ?
  }
}

// Loads state from localStorage
export const loadState = (stateName) => {
  try {
    const serializedState = localStorage.getItem(stateName)
    if (serializedState === null) {
      return undefined
    }
    const state = JSON.parse(serializedState)
    return state
  } catch (err) {
    console.log(err)
    return undefined
  }
}
