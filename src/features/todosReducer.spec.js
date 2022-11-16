import todosReducer from './todosReducer';

test('Toggles a todo based on id', () => {
  const initialState = [{ id: 0, text: 'Test text', completed: false }]

  const action = { type: 'todos/todoToggled', payload: 0 }
  const result = todosReducer(initialState, action)
  expect(result[0].completed).toBe(true)
})

test('Change todo to complete when you call for them all to marked as completed', () => {
    const initialState = [{ id: 0, text: 'Test text', completed: false },
                        { id: 1, text: 'Test text', completed: false },
                        ]
  
    const action = { type: 'todos/allCompleted'}
    const result = todosReducer(initialState, action)
    Array.from(result).forEach((todo) => {
        expect(todo.completed).toBe(true)
    });
  })

test('Colour gets added to ids', () => {
    const initialState = [{ id: 0, text: 'Test text', completed: false, colour: "Purple"},
                        { id: 1, text: 'Test text', completed: false },
                        ]
  
    const action = { type: 'todos/colourSelected', payload: {todoId: 0, color: 'blue' }}
    const result = todosReducer(initialState, action)
    console.log(result[0])
    expect(result[0].colour).toBe("blue");
  })