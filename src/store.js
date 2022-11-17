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

preloadedState = {
    todos: [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false, colour: 'purple' },
    { id: 2, text: 'Build something fun!', completed: false, colour: 'blue' }
  ],
  filters: {
    status: 'Active',
    colours: ['red', 'blue']
  }
}
const composedEnhancer = composeWithDevTools(
    //Apply middleware combines the middlesware into a middleware
    //store enhancer
    applyMiddleware(loggerMiddleware)
)

const store = createStore(rootReducer, preloadedState, composedEnhancer)

export default store