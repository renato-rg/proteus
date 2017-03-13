import { combineReducers } from 'redux'
import { SET_TREE_VIEW_TAB, SET_DOC_VIEW_TAB } from '../actions'
import switchDocument from './switchDocument.js'
import documents from './documents.js'
import projectManager from './projectManager.js'

const reducers = combineReducers({
    switchDocument,
    documents,
    projectManager
})

export default reducers
