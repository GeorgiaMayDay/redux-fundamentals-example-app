import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './store'
import './api/server'
import { Provider } from 'react-redux'

//Returns initial state
console.log('Initial state: ', store.getState())

//Logs all the changes and keeps
//the unsubscribe function returned by 
//the subscribe function
const unsubscribe = store.subscribe(() =>
  console.log('State after dispatch: ', store.getState())
)

//Now lets dispatch/do some actions

store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions'})

// Stop listening to state updates
unsubscribe()

store.dispatch({ type: 'todos/todoAdded', payload: 'Try creating a store' })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
