import React from 'react';

import { ReactComponent as TimesSolid } from './times-solid.svg';

import { availablecolours, capitalize } from '../../features/colours';
import { useSelector, useDispatch } from 'react-redux';

const selectTodoById = (state, todoId) => {
  return state.todos.find(todo => todo.id === todoId)
}


const TodoListItem = ({ id}) => {
  //Functional programming - we create a function that only has parameter
  //state but that runs selectTodoById
 const newTodo = useSelector(state =>selectTodoById(state, id))
 const { text, completed, colour } = newTodo
 const dispatch = useDispatch()


  const onColourChange = (newColour) =>{
    dispatch({ type: 'todos/colourSelected', payload: {todoId: id, colour: newColour}})
  }

  const onCompletedChange = (checked) =>{
    dispatch({ type: 'todos/todoToggled', payload: id})
  }

  const onDelete = () =>{
    dispatch({ type: 'todos/todoDeleted', payload: id} )
    console.log(newTodo)
  }
  const handleCompletedChanged = (e) => {
    onCompletedChange(e.target.checked)
  }

  const handleColourChanged = (e) => {
    onColourChange(e.target.value)
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
            onChange={handleColourChanged}
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
