import { OPEN_MODAL } from '../actions'

function currentModal(state = '', action) {
    switch (action.type) {
        case OPEN_MODAL:
            return action.modalName


        case 'LOG_ENTITIES':
            console.log('\nCURRENT MODAL')
            console.log(JSON.stringify(state, null, 2))
            return state
        default:
            return state
    }
}

export default currentModal
