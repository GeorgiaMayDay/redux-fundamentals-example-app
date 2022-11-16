// This is the king reducer
//It will be passed to create store
//It is repsonsible for all the actions that are dispatched
// and calculating what the entire new state result should be

import { combineReducers } from 'redux'
import todosReducer from './features/todosReducer'
import filtersReducer from './features/filtersReducer'

const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    todos: todosReducer,
    //This combines them with less repeated code
    filters: filtersReducer
  })
  
  export default rootReducer