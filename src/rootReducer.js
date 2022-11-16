// This is the king reducer
//It will be passed to create store
//It is repsonsible for all the actions that are dispatched
// and calculating what the entire new state result should be

const initialState = {
    todos: [
        { id: 0, test: "Learn React", completed: true },
        { id: 1, test: "Learn Redux", completed: false, colour: 'purple' },
        { id: 2, test: "Build something fun!", completed: false, colour: 'blue' },
    ],
    filters: {
        status: 'All',
        colours: []
    }
}

function updateCurrentId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
}

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'todos/todoAdded': {
            return {
                //Create copy of the state that can be changed
                ...state,
                //Todos is updated
                todos: [
                    //With all the old values
                    ...state.todos,
                    //Plus a new one
                    {
                        id: nextTodoId(state.todos),
                        text: action.payload,
                        completed: false
                    }
                ]
            }
        }
        case 'todos/todoToggled': {
            return {
                //Create copy of the state that can be changed
                ...state,
                //Todos is updated
                todos: [
                   //iterate through the todos and edit the one with
                   //matching id
                    state.todos.maps(todo =>{
                        if (todo.id == action.payload){
                            return todo
                        } 

                        return {
                            // We've found the todo that has to change. Return a copy:
                            ...todo,
                            // But we change one thing
                            completed: !todo.completed
                        }
                    }
                )]
            }
        }
        case 'filters/statusFilterChanged': {
            return {
                ...state,
                filters: {
                    //Copy all the information
                    //Edit the part you care about
                    ...state.filters,
                    status: action.payload
                }
            }
        }
        default:
            return state
    }
}