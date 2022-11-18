import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TodoItem from './todoItems'

const selectTodosId = state => state.todos.map(
    (todo) => todo.id
)

function TodoList(){

    const todoIds = useSelector(selectTodosId)
    const dispatch = useDispatch();

    const renderList = todoIds.map(todoId => {
        return <TodoItem key={todoId} id={todoId} />
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