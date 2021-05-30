import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { loadState, saveState } from "../localStorage"
import { userReducer } from "../reducers/userReducer"
import throttle from "lodash.throttle"




// * 
// Enhancers
// **
const enhancers = [
    applyMiddleware(thunk), // Allows for async action creators, a thunk is a function that returns another function
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
]


// Persisted state via localStorage
const persistedState = loadState()


// * 
// Store 
// **
const store = createStore(
    userReducer,
    persistedState,
    compose(...enhancers)
)


// Use return value of loadState as the second argument to create store so that it
// overrides the initial state specified by the reducers

// Subscripe to the store
store.subscribe(throttle(() => {
    saveState({ // called every time the storage state changes
        user: store.getState().user
    })
}, 1000))

export default store





