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
        if (showAllCompletions && colours.length){
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
