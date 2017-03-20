import { OPEN_MODAL } from '../actions'

function currentModal(state = '', action) {
    switch (action.type) {
        case OPEN_MODAL:
            return action.modalName
        default:
            return state
    }
}

export default currentModal
