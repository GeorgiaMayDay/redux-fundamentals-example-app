import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TodoItem from './todoItems'

const selectTodos = state => state.todos

function TodoList(){

    const todos = useSelector(selectTodos)
    const dispatch = useDispatch();

    const renderList = todos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />
      })

    return(
        <main>
            <h1>
                TODO
            </h1>
            <div className='todoapp'>
                <ul className='todo-list'>
                    {renderList}
                </ul>

            </div>
        </main>
    )
}

export default TodoList