import React from 'react'

function TodoItem(todo){
    return(
            <li>
                <div className='view'>
                    <input
                        className="toggle"
                        type="checkbox"
                        />
                    <div className="todo-text">
                        Learn React
                    </div>
                    <div>
                        <select
                        className='colourPicker'>
                            <option value="Purple">Purple</option>
                            <option value="Urple">Urple</option>
                        </select>
                    </div>
                </div>
            </li>)
}
export default TodoItem;