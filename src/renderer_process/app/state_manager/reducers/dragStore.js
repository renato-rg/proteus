import { SET_DRAGGING_DATA, CLEAR_DRAGGING_DATA } from '../actions'

const initialState = {}

function dragStore(state = initialState, action) {
    switch (action.type) {
        case SET_DRAGGING_DATA:
            return Object.assign({}, action.payload)
        case CLEAR_DRAGGING_DATA:
            return {}
        default:
            return state
    }
}

export default dragStore
