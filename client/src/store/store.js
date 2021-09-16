import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { loadState, saveState } from "../localStorage"
import { userReducer } from "../reducers/userReducer"
import { errorReducer } from "../reducers/errorReducer"
import { subredditsReducer } from "../reducers/subredditsReducer"
import { subredditReducer } from "../reducers/subredditReducer"
import { darkModeReducer } from "../reducers/darkModeReducer"
import { postListReducer } from "../reducers/postListReducer"
import { postReducer } from "../reducers/postReducer"
import { loadingReducer } from "../reducers/loadingReducer"
import { commentsReducer } from "../reducers/commentsReducer"
import throttle from "lodash.throttle"

const enhancers = [
    applyMiddleware(thunk), // Allows for async action creators, a thunk is a function that returns another function
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true }) || compose
]

// Persisted state via localStorage
const persistedState = loadState()

const rootReducer = combineReducers({
    auth: userReducer, 
    subreddits: subredditsReducer,
    currentSubreddit: subredditReducer,
    postList: postListReducer,
    post: postReducer,
    error: errorReducer,
    loading: loadingReducer,
    darkMode: darkModeReducer,
    comments: commentsReducer
})


const store = createStore(
    rootReducer,
    persistedState,
    compose(...enhancers)
)


// Use return value of loadState as the second argument to create store so that it
// overrides the initial state specified by the reducers

// Subscribe to the store
store.subscribe(throttle(() => {
    saveState(store.getState().auth, 'authState')
    saveState(store.getState().darkMode, 'darkModeState')
}, 1000))

export default store





