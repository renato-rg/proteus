import { SET_TREE_VIEW_TAB, SET_DOC_VIEW_TAB } from '../actions'

function switchDocument(state = {navActiveTab: 0, sectionActiveTab: 0}, action) {
    switch (action.type) {
        case SET_TREE_VIEW_TAB:
            return Object.assign({}, state, {
                navActiveTab: action.index
            })
        case SET_DOC_VIEW_TAB:
            return Object.assign({}, state, {
                sectionActiveTab: action.index
            })
        default:
            return state
    }
}

export default switchDocument
