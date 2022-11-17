//This is a slice - a mini reducer
const initialState = {
    status: 'All',
    colours: []
}

export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case 'filters/statusFilterChanged': {
            return {
                    ...state,
                    status: action.payload
                }
        }
        case 'filters/colorFilterChanged':{
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