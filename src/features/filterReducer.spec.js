import filtersReducer, { statusChanged } from './filtersReducer';

test('Change status', () => {
  const initialState = {
    status: 'All',
    colours: []
}

  //const action = { type: 'filters/statusFilterChanged', payload: "active" }
  const action = statusChanged("active")
  const result = filtersReducer(initialState, action)
  expect(result.status).toBe("active")
})

test('Change colour filter', () => {
  const initialState = {
    status: 'All',
    colours: []
}

  const addedAction = { type: 'filters/ColourFilterChanged', payload:  {colour: 'red', changeType: 'added' } }
  const addedResult = filtersReducer(initialState, addedAction)
  expect(addedResult.colours).toContain('red');

  const removedAction = { type: 'filters/ColourFilterChanged', payload:  {colour: 'red', changeType: 'remove' } }
  const removedResult = filtersReducer(initialState, removedAction)
  expect(removedResult.colours).not.toContain('red');
})