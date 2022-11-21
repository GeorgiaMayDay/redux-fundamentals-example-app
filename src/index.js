import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './store'
import './api/server'
import { Provider } from 'react-redux'
import { fetchTodos } from './features/todosReducer'

//Returns initial state
console.log('Initial state: ', store.getState())

//Le gasp! We're dispatching a function, an async one at that
store.dispatch(fetchTodos)
//Now lets dispatch/do some actions
store.dispatch({ type: 'todos/todoAdded', payload: { id: 0, text: 'Learn about actions', completed: true }})
store.dispatch({ type: 'todos/todoAdded', payload: { id: 1, text: 'Try creating a store' , completed: true }})


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
