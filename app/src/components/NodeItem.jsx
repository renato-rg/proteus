import React, {Component} from 'react'
import NodeList from './NodeList.jsx'
import { DragSource, DropTarget } from 'react-dnd'


import {hoverTarget} from '../styles/treeView.css'

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
                monitor.getItem().indexes, props.indexes, 0)
        }
        return
    }
}

//TODO: So far, it's the only class I modified to have react-dnd, was it worthy?
//should I try sortable-hoc? or synthetic events? or html5?
class NodeItem2 extends Component {
    render() {
        const {item, isDragging, connectDragSource, connectDropTarget, moveNode, indexes} = this.props
        const styles = {
            opacity: isDragging ? 0.5 : 1,
            paddingLeft: (0.6+2*(indexes.length-1))+'em'
        }
        return connectDragSource(connectDropTarget(
            <div>
            <li className={hoverTarget}>
                <div style={styles}>{item.title}</div>
            </li>
            {item.children && <NodeList
                children={item.children}
                moveNode={moveNode}
                indexes={indexes}/>}
                </div>
        ))
    }
}

export default DropTarget('item', dropTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))(DragSource('item', dragSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(NodeItem2))
