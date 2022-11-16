const initialState = [
    { id: 0, test: "Learn React", completed: true },
    { id: 1, test: "Learn Redux", completed: false, colour: 'purple' },
    { id: 2, test: "Build something fun!", completed: false, colour: 'blue' }
]

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
                {
                    id: nextTodoId(state.todos),
                    text: action.payload,
                    completed: false
                }
            ]
        }
        case 'todos/todoToggled': {
            //iterate through the todos and edit the one with
            //matching id
            return state.todos.maps(todo =>{
                        if (todo.id == action.payload){
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
            let {colour, changeType } = action.payload
            const { colours } = state
            //iterate through the todos and edit the one with
            //matching id
            return state.todos.maps(todo =>{
                        if (todo.id == action.payload){
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
        default:
            return state
    }
}