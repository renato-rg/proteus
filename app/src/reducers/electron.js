import { OPEN_PROJECT, NEW_PROJECT } from '../actions'

const initialState = {}

function electron(state = initialState, action) {
    switch (action.type) {
        case OPEN_PROJECT:
            console.log('OPEN_PROJECT', action.arg)
            return state
        case NEW_PROJECT:
            console.log('NEW_PROJECT', action.arg)
            return state
        default:
            return state
    }
}

export default electron
