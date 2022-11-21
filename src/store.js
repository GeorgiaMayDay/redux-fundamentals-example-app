import todosReducer from './features/todosReducer'
import filtersReducer from './features/filtersReducer'
import { configureStore} from '@reduxjs/toolkit'

//Configure sets up the root reducer
//Adds thunk
//Adds logging 
//Sets up Redux DevTools
const store = configureStore({
    reducer:{
        todos: todosReducer,
    //This combines them with less repeated code
        filters: filtersReducer
    }
})

export default store