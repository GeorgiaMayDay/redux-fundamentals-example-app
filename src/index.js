import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './store'
import './api/server'
import {client} from './api/client'
import { Provider } from 'react-redux'
import { fetchTodos } from './features/todosReducer'

//Returns initial state
console.log('Initial state: ', store.getState())

//Now lets dispatch/do some actions

store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions'})
store.dispatch({ type: 'todos/todoAdded', payload: 'Try creating a store' })

//Le gasp! We're dispatching a function, an async one at that
store.dispatch(fetchTodos)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
