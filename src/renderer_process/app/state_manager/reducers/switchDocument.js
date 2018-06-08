import { SET_TREE_VIEW_TAB, SET_DOC_VIEW_TAB, SHOW_EXPLORER,
    PUSH_TAB, REMOVE_TAB } from '../actions'

const initialState = {
    navActiveTab: 0,
    sectionActiveTab: 0,
    showExplorer: true,
    sectionTabs: ['DOCUMENT_VIEWER']
}

function switchDocument(state = initialState, action) {
    switch (action.type) {
        case PUSH_TAB: {
            const index = state.sectionTabs.indexOf(action.id)
            let query
            if (index>-1){
                query = {
                    sectionActiveTab: index
                }
            }
            else if (action.focus) {
                query = {
                    sectionActiveTab: state.sectionTabs.length,
                    sectionTabs: state.sectionTabs.concat(action.id)
                }
            }
            else {
                query = {
                    sectionTabs: state.sectionTabs.concat(action.id)
                }
            }
            return Object.assign({}, state, query)
        }
        case REMOVE_TAB: {
            return Object.assign({}, state, {
                sectionActiveTab: state.sectionActiveTab-(action.index<=state.sectionActiveTab?1:0),
                sectionTabs: state.sectionTabs.slice(0, action.index).concat(state.sectionTabs.slice(action.index+1, state.sectionTabs.length))
            })
        }
        case SET_TREE_VIEW_TAB: {
            return Object.assign({}, state, {
                navActiveTab: action.index
            })
        }
        case SET_DOC_VIEW_TAB: {
            return Object.assign({}, state, {
                sectionActiveTab: action.index
            })
        }
        case SHOW_EXPLORER: {
            return Object.assign({}, state, {
                showExplorer: action.payload
            })
        }
        default:
            return state
    }
}

export default switchDocument
