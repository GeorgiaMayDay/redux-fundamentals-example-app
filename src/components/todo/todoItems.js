import React from 'react'

import { ReactComponent as TimesSolid } from './times-solid.svg'

import { availablecolours, capitalize } from '../../features/colours'

const TodoListItem = ({ todo, oncolourChange, onCompletedChange, onDelete }) => {
  const { text, completed, colour } = todo

  const handleCompletedChanged = (e) => {
    onCompletedChange(e.target.checked)
  }

  const handlecolourChanged = (e) => {
    oncolourChange(e.target.value)
  }

  const colourOptions = availablecolours.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ))

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colourPicker"
            value={colour}
            style={{ colour }}
            onChange={handlecolourChanged}
          >
            <option value=""></option>
            {colourOptions}
          </select>
          <button className="destroy" onClick={onDelete}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
