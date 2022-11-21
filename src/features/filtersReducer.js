export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed',
  }

//This is a slice - a mini reducer
const initialState = {
    status: 'all',
    colours: []
}

export const statusChanged = (newStatus) => {
    return {
      type: 'filters/statusFilterChanged',
      payload: newStatus
    }
  }

export const colourChanged = (newColour, newChangeType) => {
    return {
      type: 'filters/ColourFilterChanged',
      payload: {colour: newColour, changeType: newChangeType}
    }
  }



export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case 'filters/statusFilterChanged': {
            return {
                    ...state,
                    status: action.payload
                }
        }
        case 'filters/ColourFilterChanged':{
            let {colour, changeType } = action.payload
            const { colours } = state

            switch (changeType){
                case 'added':
                    if (colours.includes(colour)){
                        //Check if it's already been included
                        return state
                    }
                    return{
                        ...state,
                        colours: colours.concat([colour]),
                        
                    }
                case 'removed':
                    if (colours.includes(colour)){
                        //Check if it's already been included
                        return{
                            ...state,
                            colours: state.colours.filter(
                                (currentColour) => currentColour !== colour
                            ),
                        }
                    }
            }
        }
        default:
            return state
    }
}