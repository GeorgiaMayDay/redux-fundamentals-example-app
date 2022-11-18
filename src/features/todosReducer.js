import { client } from "../api/client"
import { createSelector } from "reselect"
import { StatusFilters } from "./filtersReducer"

const initialState = []

export const todoAdded = todo => {
    return {
      type: 'todos/todoAdded',
      payload: todo
    }
  }

export const todosLoaded = todos => {
return {
    type: 'todos/todosLoaded',
    payload: todos
}
}

export const todoDeleted = todoId => {
    return {
        type: 'todos/todoDeleted',
        payload: todoId
    }
}

export const todosToggled = todoId => {
    return {
        type: 'todos/todoToggled',
        payload: todoId
    }
}

export const colourSelected = (newTodoid, newColour) => {
    return {
        type: 'todos/colourSelected',
        payload: { todoId: newTodoid, colour: newColour }
    }
}

export const allCompleted = () => {
    return {
        type: 'todos/allCompleted'
    }
}

export const completedCleared = () => {
    return {
        type: 'todos/completedCleared'
    }
}

function updateCurrentId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
}

export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case 'todos/todoAdded': {
            return [
                //Create copy of the state that can be changed
                ...state,
                action.payload
                // {
                //     id: updateCurrentId(state),
                //     text: action.payload,
                //     completed: false
                // }
            ]
        }
        case 'todos/todosLoaded': {
            return action.payload
        }
        case 'todos/todoToggled': {
            //iterate through the todos and edit the one with
            //matching id
            return state.map(todo =>{
                        if (todo.id !== action.payload){
                            ///... not needed as there is no edit
                            return todo
                        } 
                        return {
                            // We've found the todo that has to change. Return a copy:
                            ...todo,
                            // But we change one thing
                            completed: !todo.completed
                        }
                    })
                }
        case 'todos/colourSelected': {
            let { todoId, colour } = action.payload
            //iterate through the todos and edit the one with
            //matching id
            return state.map(todo =>{
                        if (todo.id !== todoId){
                            ///... not needed as there is no edit
                            return todo
                        } 
                        return {
                            // We've found the todo that has to change. Return a copy:
                            ...todo,
                            colour: colour,
                            // This updates colours - 
                            //not sure how will have to see implementation
        
                        }
                    })
                }
        case 'todos/todoDeleted':{
            return state.filter((todo) => todo.id !== action.payload)
        }
        case 'todos/allCompleted':{
            return state.map(todo =>{
                    return{
                        ...todo,
                        completed: true
                    }
                })
            }
        case 'todos/completedCleared':{
            return state.filter(
                    (todo) => todo.completed === false)
            }
        default:
            return state
    }
}

export async function fetchTodos(dispatch, getState){
    const response = await client.get('/fakeApi/todos')

    const stateBefore = getState()
    console.log('Todos before loaded in: ', stateBefore.todos.length)
    dispatch(todosLoaded(response.todos))

    const stateAfter = getState()
    console.log('Todos after loaded in: ', stateAfter.todos.length)
}

export function saveTodoText(text){
    return async function saveTodo(dispatch, getState){
        const newTodo = {text}
        const response = await client.post('/fakeApi/todos', {todo: newTodo})
        dispatch(todoAdded(response.todo))
    }
}

// This is good if we're deriving additional data from the original values
// As it limits the updates 
export const selectTodoIds = createSelector(
    //input selector
    state => state.todos,
    // output selector recives input results
    // and returns final value
    todos => todos.map(todo => todo.id)
)

export const completedTodos = createSelector(
    //input selector
    state => state.todos,
    state => state.todos.status,
    // Output Selector: recieves both values
    (todos, status) =>{
        if (status === StatusFilters.All){
            return todos
        }

        const completedStatus = status ===StatusFilters.Completed
        return todos.filter(todo => todo.completed === completedStatus)
    
    }
)

export const selectFilterTodoIds = createSelector(
    //memoized selector as input
    completedTodos,
    // output selector recives input results
    // and returns final value
    filteredTodos => filteredTodos.map(todo => todo.id)
)
