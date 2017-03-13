import { OPEN_PROJECT } from '../actions'

const initialState = {
    projectOpened: false,
    projectPath: '',
    previousProjects: []
}

function switchDocument(state = initialState, action) {
    switch (action.type) {
        case OPEN_PROJECT:
            return Object.assign({}, state, {
                projectOpened: action.projectOpened,
                projectPath: action.projectPath
            })
        default:
            return state
    }
}

export default switchDocument
