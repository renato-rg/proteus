import { combineReducers } from 'redux'
import switchDocument from './switchDocument.js'
import entities from './entities.js'
import currentModal from './currentModal.js'
import appState from './appState.js'
import classes from './classes.js'
import dragStore from './dragStore.js'

const reducers = combineReducers({
    dragStore,
    entities,
    classes,
    switchDocument,
    currentModal,
    appState
})

export default reducers
