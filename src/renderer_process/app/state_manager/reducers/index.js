import { combineReducers } from 'redux'
import switchDocument from './switchDocument.js'
import entities from './entities.js'
import currentModal from './currentModal.js'
import appState from './appState.js'

const reducers = combineReducers({
    entities,
    switchDocument,
    currentModal,
    appState
})

export default reducers
