import { MOVE_NODE, TOGGLE_NODE, LOAD_PROJECT, UPDATE_EDITABLE_FIELD } from '../actions'
import update from 'immutability-helper'

function entitiesReducer(state = {}, action) {
    switch (action.type) {

        case UPDATE_EDITABLE_FIELD:
            const query = action.fieldPath.reduceRight( (last, current) => {
            	return { [current] : last }
            }, {$set: action.newValue})

            return update(state, {
                [action.nodeID]: query
            })

        case TOGGLE_NODE:
            const currentBool = state[action.nodeID].showChildren
            return update(state, {
                [action.nodeID]: {showChildren: {$set: !currentBool}}
            })

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

        // Load project state
        case LOAD_PROJECT:
            console.log(JSON.stringify(action.payload, null, 2))
            return action.payload

        default:
            return state
    }
}

export default entitiesReducer
