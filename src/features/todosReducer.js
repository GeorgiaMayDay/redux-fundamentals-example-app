import { client } from "../api/client"
import { createSelector } from "reselect"
import { StatusFilters } from "./filtersReducer"
import { createSlice } from '@reduxjs/toolkit'
import { toBeInvalid } from "@testing-library/jest-dom"

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
        type: 'todos/todosToggled',
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

const todosReducer = createSlice ({
    name: 'todos',
    initialState,
    reducers:{
        todoAdded(state, action){
            //mutating code is okay here becase createSlice is magic
            state.push(action.payload)
        },
        todosToggled(state, action){
            //Mutation!!
            const todo = state.find(todo => todo.id === action.payload)
            todo.completed = !todo.completed
            console.log(todo.completed)
        },
        todosLoading(state, action){
            return{
                ...state,
                status: 'loading'
            }
        },
        todosLoaded(state, action){
            return action.payload
        },
        colourSelected(state, action){
            let { todoId, colour } = action.payload
            const todo = state.find(todo => todo.id === todoId)
            todo.colour = colour;
        },
        todoDeleted(state, action){
            return state.filter((todo) => todo.id !== action.payload)
        },
        allCompleted(state, action){
            return state.map(todo =>{
            return{
                    ...todo,
                    completed: true
                }
            })
        },
        completedCleared(state, action){
            return state.filter(
                (todo) => todo.completed === false)
        },
        default(state, action){
            return state
        }
    }
});

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

//This checks if any of the input selectors return something different
//If they don't,it just returns the same value skipping the expensive map/sort
export const selectTodoIds = createSelector(
    //input selector
    state => state.todos,
    // output selector recives input results
    // and returns final value
    todos => todos.map(todo => todo.id)
)

export const selectfilteredTodos = createSelector(
    //input selector
    state => state.todos,
    state => state.filters,
    // Output Selector: recieves both values
    (todos, filters) =>{
        const {status, colours} = filters
        const showAllCompletions = status === StatusFilters.All
        if (showAllCompletions && colours.length ==0){
            return todos
        }

        const completedStatus = status === StatusFilters.Completed

        return todos.filter(todo => {
            const statusMatches =
        showAllCompletions || todo.completed === completedStatus
      const colourMatches = colours.length === 0 || colours.includes(todo.colour)
      return statusMatches && colourMatches
        })
    
    }
)

export const colourTodos = createSelector(
    //input selector
    state => state.todos,
    state => state.filters.colours,
    // Output Selector: recieves both values
    (todos, colours) =>{
        if (colours === []){
            return todos
        }

        return todos.filter(todo => colours.includes(todo.colour))
    
    }
)

export const selectFilterTodoIds = createSelector(
    //memoized selector as input
    selectfilteredTodos,
    // output selector recives input results
    // and returns final value
    filteredTodos => filteredTodos.map(todo => todo.id)
)

//export const { todoAdded, todosToggled, todosLoading } = todosReducer.actions

export default todosReducer.reducer