import { DropTarget } from 'react-dnd'
const acceptedChildren = require('../../constants/acceptedChildren.json')

// Makes the component droppable
export default function makeItDroppable (component) {
    return DropTarget(['item', 'tool'], spec, collect) (component)
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
})

const canDropInto = (accepted = [], innerType, type, fromToolbar, sourceID, sParentID, targetID) => {
    const shallowChecker = (sourceID !== sParentID && sourceID !== targetID) || fromToolbar
    const effect = fromToolbar ? 'copy' : 'move'
    if (accepted === 'all')
        return shallowChecker && !innerType ? effect : 'none'
    return shallowChecker && accepted.indexOf(type) >= 0 ? effect : 'none'
}

// Dragging area relative to target component's size
const whatDirection = (monitor, component) => {
    const {height, top} = component.nodeRef.getBoundingClientRect()
    const {y} = monitor.getClientOffset()
    if (y < top + height * .25)
        return 'TOP'
    else if (y < top + height * .75)
        return 'MID'
    else
        return 'BOTTOM'
}

const spec = {
    hover(props, monitor, component) {
        const direction = whatDirection(monitor, component)
        const {updateDropEffectTo, innerType, type, sourceNodeID, sourceParentID, fromToolbar} = monitor.getItem()
        const accepted = direction === 'MID' ? acceptedChildren[props.node.type] : acceptedChildren[props.parentType]
        const dropEffect = canDropInto(accepted, innerType, type, fromToolbar,
                                        sourceNodeID, sourceParentID, props.node.nodeID)
        component.updateCSSEffect(dropEffect, direction)
        updateDropEffectTo(dropEffect)
        return
    },

    drop(props, monitor, component) {
        const draggedNode = monitor.getItem()
        const direction = whatDirection(monitor, component)

        if (draggedNode.fromToolbar)
            props.createNode(draggedNode.type, direction, props.node.nodeID, props.parentID)
        else
            props.moveNode(direction, draggedNode.sourceNodeID, draggedNode.sourceParentID)

        return
    }
}
