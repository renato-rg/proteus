import { MOVE_NODE } from '../actions'
import update from 'immutability-helper'

// Mockup data
const uc1 = require('../assets/obj1.json')
const uc2 = require('../assets/obj2.json')
const uc3 = require('../assets/obj3.json')

// Mockup data
const documents = [
    {
        title: 'Doc 1',
        children: [uc1, uc2]
    },
    {
        title: 'Doc 2',
        children: [uc3]
    },
    {
        title: 'Doc 3',
        children: []
    }
]

function moveNode(state = documents, action) {
    switch (action.type) {
        case MOVE_NODE:
            let {sourceDepth, targetDepth, sourceIndex, targetIndex, sourceIndexes, targetIndexes, active} = action
            console.log(sourceDepth, targetDepth, sourceIndex, targetIndex, sourceIndexes, targetIndexes, active)

            //TODO determine if it goes down or up, using screen coordinates myb?
            let fixer = sourceDepth > targetDepth

            // Dragged node
            let draggedItem = sourceIndexes.reduce((last, current) => {
                return last.children[current]
            }, state[0])

            const query = (navActiveTab, indexes, query) => {
                return {
                    [navActiveTab]: indexes.reduceRight((last, current) => {
                    	return { children: { [current]: last } }
                    }, { children: { $splice: [ query ] } })
                }
            }

            // Query to remove the dragged node
            sourceIndex = sourceIndexes.pop()
            let remove = query(0, sourceIndexes, [sourceIndex, 1])

            // Query to insert dragged node in new place
            targetIndex = targetIndexes.pop()
            let insert = query(0, targetIndexes, [targetIndex, 0, draggedItem])
            return update( update(state, remove), insert)

        default:
            return state
    }
}

export default moveNode
