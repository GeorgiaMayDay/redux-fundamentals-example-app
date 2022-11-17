import {createStore, applyMiddleware} from 'redux'
import rootReducer from './rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { loggerMiddleware } from './exampleAddons/middleware'

let preloadedState
const persistedTodosString = localStorage.getItem('todos')

if (persistedTodosString){
    preloadedState = {
        todos: JSON.parse(persistedTodosString)
    }
}

const composedEnhancer = composeWithDevTools(
    //Apply middleware combines the middlesware into a middleware
    //store enhancer
    applyMiddleware(loggerMiddleware)
)

const store = createStore(rootReducer, preloadedState, composedEnhancer)

export default store