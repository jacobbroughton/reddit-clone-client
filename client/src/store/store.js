import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { userReducer } from "../reducers/userReducer"

const enhancers = [
    applyMiddleware(thunk), // Allows for async action creators, a thunk is a function that returns another function
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
]

export const store = createStore(
    userReducer,
    compose(...enhancers)
)