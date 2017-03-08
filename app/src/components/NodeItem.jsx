import React, {Component} from 'react'
import {render} from 'react-dom'
import NodeList from './NodeList.jsx'
import { DragSource, DropTarget } from 'react-dnd'

const dragSource = {
    beginDrag(props) {
        return {
            indexes: props.indexes
        }
    }
}
const dropTarget = {
    drop(props, monitor, component) {
        // If a nested element has already handled the drop
        const hasDroppedOnChild = monitor.didDrop();
        // This is true for when drop() is called twice or more
        if (hasDroppedOnChild) {
          return
        }
        const sourceDepth = monitor.getItem().indexes.length
        const targetDepth = props.indexes.length
        const sourceIndex = monitor.getItem().indexes[sourceDepth-1]
        const targetIndex = props.indexes[targetDepth-1]
        if (targetDepth == sourceDepth && sourceIndex != targetIndex) {
            props.moveNode(sourceDepth, targetDepth,
                sourceIndex, targetIndex,
                monitor.getItem().indexes, props.indexes)
        }
        return
    }
}

//TODO: So far, it's the only class I modified to have react-dnd, was it worthy?
//should I try sortable-hoc? or synthetic events? or html5?
class NodeItem extends Component {
    render() {
        const {item, isDragging, connectDragSource, connectDropTarget} = this.props
        return connectDragSource(connectDropTarget(
            <li style={{opacity: isDragging ? 0.5 : 1}}>
                {item.title}
                {item.children && <NodeList
                    children={item.children}
                    moveNode={this.props.moveNode}
                    indexes={this.props.indexes}/>}
            </li>
        ))
    }
}

export default DropTarget('item', dropTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))(DragSource('item', dragSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(NodeItem))
