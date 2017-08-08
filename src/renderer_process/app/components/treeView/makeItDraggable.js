import { DragSource } from 'react-dnd'

// Makes the component draggable
export default function makeItDraggable (component) {
    return DragSource('item', spec, collect) (component)
}

const spec = {
    beginDrag(props, monitor, component) {
        return {
            type: props.node.type,
            innerType: props.node.innerType,
            sourceNodeID: props.node.nodeID,
            sourceParentID: props.parentID,
            updateDropEffectTo: component.decoratedComponentInstance.updateDropEffectTo
        }
    }
}
const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
})
