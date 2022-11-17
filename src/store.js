import {createStore, applyMiddleware} from 'redux'
import rootReducer from './rootReducer'
import { print1, print2, print3 } from './exampleAddons/middleware'

let preloadedState
const persistedTodosString = localStorage.getItem('todos')

if (persistedTodosString){
    preloadedState = {
        todos: JSON.parse(persistedTodosString)
    }
}

//Apply middleware combines the middlesware into a middleware
//store enhancer
const middlewareEnhancer = applyMiddleware(print1, print2, print3)

const store = createStore(rootReducer, preloadedState, middlewareEnhancer)

export default store