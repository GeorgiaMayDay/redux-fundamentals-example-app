import React from 'react'
import {useSelector } from 'react-redux'

import { availablecolours, capitalize } from '../features/colours'
import { StatusFilters } from '../features/filtersReducer'

const RemainingTodos = ({ count }) => {
  const suffix = count === 1 ? '' : 's'
  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  )
}



const StatusFilter = ({ value: status, onChange }) => {
  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key]
    const handleClick = () => onChange(value)
    const className = value === status ? 'selected' : ''

    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    )
  })

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  )
}

const ColourFilters = ({ value: colours, onChange }) => {
  const renderedcolours = availablecolours.map((colour) => {
    const checked = colours.includes(colour)
    const handleChange = () => {
      const changeType = checked ? 'removed' : 'added'
      onChange(colour, changeType)
    }

    return (
      <label key={colour}>
        <input
          type="checkbox"
          name={colour}
          checked={checked}
          onChange={handleChange}
        />
        <span
          className="colour-block"
          style={{
            backgroundcolour: colour,
          }}
        ></span>
        {capitalize(colour)}
      </label>
    )
  })

  return (
    <div className="filters ColourFilters">
      <h5>Filter by colour</h5>
      <form className="colourSelection">{renderedcolours}</form>
    </div>
  )
}

function selectTotalCompletedTodos (state) {
  const completedTodos = state.todos.filter(todo => todo.completed)
  return completedTodos.length
}

const CompletedTodos = ( {count} ) => {
  const suffix = count === 1 ? '' : 's'

  return (
    <div className="todo-count">
      <h5>Completed Todos</h5>
      <strong>{count}</strong> item{suffix} done
    </div>
  )
}

const Footer = () => {
  const todosRemaining = useSelector(state =>{
    const uncompletedTodos = state.todos.filter(todo => !todo.completed)
    return uncompletedTodos.length
  })

  const numofcompleted = useSelector(selectTotalCompletedTodos)
  const { status, colours} = useSelector(state => state.filters)

  const oncolourChange = (colour, changeType) =>
    console.log('Colour change: ', { colour, changeType })
  const onStatusChange = (status) => console.log('Status change: ', status)

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button">Mark All Completed</button>
        <button className="button">Clear Completed</button>
      </div>

      <RemainingTodos count={todosRemaining} />
      <CompletedTodos count={numofcompleted} />
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColourFilters value={colours} onChange={oncolourChange} />
    </footer>
  )
}

export default Footer