import { MOVE_NODE, TOGGLE_NODE, LOAD_PROJECT, UPDATE_EDITABLE_FIELD, CREATE_NODE } from '../actions'
import update from 'immutability-helper'
import uuid from 'uuid/v1'
import objects from './defaultObjects'

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

        case CREATE_NODE: {
            const {nodeType, direction, nodeID, parentID} = action
            const sourceNodeID = uuid()
            let nodeToInsert = Object.assign(objects[nodeType] || objects['folder'], {nodeID: sourceNodeID, title: sourceNodeID})
            let targetID, operation
            if (direction === 'MID') {
                targetID = nodeID
                operation = {$push: [sourceNodeID]}
            } else {
                const index = state[parentID].childrenIDs.indexOf(nodeID)
                targetID = parentID
                operation = {$splice: [[index+(direction==='TOP'?0:1), 0, sourceNodeID]]}
            }
            return update(state, {
                $merge: { [sourceNodeID]: nodeToInsert },
                [targetID]: {childrenIDs: operation}
            })
        }
        case MOVE_NODE:
            const {direction, sourceNodeID, sourceParentID, targetNodeID, targetParentID} = action

            // Removes draggingNode from its parent
            const sourceNodeIndex = state[sourceParentID].childrenIDs.indexOf(sourceNodeID)
            let transitionState = update(state, {
                [sourceParentID]: {childrenIDs: {$splice: [[sourceNodeIndex, 1]]}}
            })

            // Whether it goes up, down of is inserted into the node
            let target, operation
            if (direction === 'MID') {
                target = targetNodeID
                operation = {$push: [sourceNodeID]}
            } else {
                const targetNodeIndex = transitionState[targetParentID].childrenIDs.indexOf(targetNodeID)
                target = targetParentID
                operation = {$splice: [[targetNodeIndex+(direction==='TOP'?0:1), 0, sourceNodeID]]}
            }

            // Perfoms insertion in new parent
            let newState = update(transitionState, {
                [target]: {childrenIDs: operation}
            })

            return newState

        // Load project state
        case LOAD_PROJECT:
            //console.log(JSON.stringify(action.payload, null, 2))
            return action.payload

        default:
            return state
    }
}

export default entitiesReducer
