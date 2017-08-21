import { SET_TREE_VIEW_TAB, SET_DOC_VIEW_TAB, TOGGLE_LEFT_PANEL,
    SLIDE_NODE_PROPERTIES, SET_DETAILS_NODE_ID } from '../actions'

const initialState = {
    navActiveTab: 0,
    sectionActiveTab: 0,
    showLeftPanel: true,
    showDetails: false,
    detailsNodeID: ''
}

function switchDocument(state = initialState, action) {
    switch (action.type) {
        case SET_TREE_VIEW_TAB:
            return Object.assign({}, state, {
                navActiveTab: action.index
            })
        case SET_DOC_VIEW_TAB:
            return Object.assign({}, state, {
                sectionActiveTab: action.index
            })
        case TOGGLE_LEFT_PANEL:
            return Object.assign({}, state, {
                showLeftPanel: !state.showLeftPanel
            })
        case SLIDE_NODE_PROPERTIES:
            return Object.assign({}, state, {
                showDetails: action.payload
            })
        case SET_DETAILS_NODE_ID:
            return Object.assign({}, state, {
                detailsNodeID: action.id
            })
        default:
            return state
    }
}

export default switchDocument
