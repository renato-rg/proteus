import { MOVE_NODE, TOGGLE_NODE, OPEN_PROJECT } from '../actions'
import update from 'immutability-helper'
import { readProject } from '../io'

function projectReducer(state = {}, action) {
    switch (action.type) {
        case TOGGLE_NODE:
            const currentBool = state[action.nodeID].showChildren
            return update(state, {
                [action.nodeID]: {showChildren: {$set: !currentBool}}
            })
        // TODO : Rewrite
        case MOVE_NODE:
            const {sourceNodeID, sourceParentID, targetNodeID, targetParentID} = action
            console.log(sourceNodeID, sourceParentID, targetNodeID, targetParentID)

            // Query to remove the dragged node from its parent
            const sourceNodeIndex = state[sourceParentID].childrenIDs.indexOf(sourceNodeID)
            let new_state_1 = update(state, {
                [sourceParentID]: {childrenIDs: {$splice: [[sourceNodeIndex, 1]]}}
            })

            const targetNodeIndex = state[targetParentID].childrenIDs.indexOf(targetNodeID)
            let new_state_2 = update(new_state_1, {
                [targetParentID]: {childrenIDs: {$splice: [[targetNodeIndex, 0, sourceNodeID]]}}
            })

            return new_state_2

        case OPEN_PROJECT:
            return readProject(action.projectPath)
        default:
            return state
    }
}

export default projectReducer
