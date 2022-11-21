import todosReducer, {todoAdded, todoDeleted} from './todosReducer';

test('Toggles a todo based on id', () => {
  const initialState = [{ id: 0, text: 'Test text', completed: false }]

  const action = { type: 'todos/todosToggled', payload: 0 }
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
  
    const action = { type: 'todos/colourSelected', payload: {todoId: 0, colour: 'blue' }}
    const result = todosReducer(initialState, action)
    expect(result[0].colour).toBe("blue");

    const action2 = { type: 'todos/colourSelected', payload: {todoId: 1, colour: 'blue' }}
    const result2 = todosReducer(initialState, action2)
    expect(result2[1].colour).toBe("blue");
  })

  test('Delete all completed tasks', () => {
    const initialState = [{ id: 0, text: 'Test text', completed: true },
                        { id: 1, text: 'Test text', completed: false },
                        { id: 2, text: 'Test text', completed: true },]
  
    const action = { type: 'todos/completedCleared'}
    const result = todosReducer(initialState, action)
    expect(result.length).toBe(1);
  })

  test('Delete one tasks', () => {
    const initialState = [{ id: 0, text: 'Test text', completed: true },
                        { id: 1, text: 'Test text', completed: false },
                        { id: 2, text: 'Test text', completed: true },]
  
    const action = todoDeleted(1);
    console.log(action)
    const result = todosReducer(initialState, action)
    expect(result.length).toBe(2);
  })

  test('Delete one tasks', () => {
    const initialState = [{ id: 0, text: 'Test text', completed: true },
                        { id: 1, text: 'Test text', completed: false },]
  
    const action = todoAdded({ id: 2, text: 'Test text', completed: true });
    console.log(action)
    const result = todosReducer(initialState, action)
    expect(result.length).toBe(3);
  })