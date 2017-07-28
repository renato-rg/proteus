import React, {Component} from 'react'
import NodeList from './NodeList.jsx'
import Icon from '../icons/Icon.jsx'
import { DragSource, DropTarget } from 'react-dnd'
import {hoverTarget} from './treeView.css'

//Redux
import { toggleNode, moveNode } from '../../state_manager/actions'
import { connect } from 'react-redux'

const dragSource = {
    beginDrag(props) {
        return {
            sourceNodeID: props.nodeID,
            sourceParentID: props.parentID
        }
    }
}
const dropTarget = {
    drop(props, monitor, component) {
        // If a nested element has already handled the drop
        // This is true for when drop() is called twice or more
        if (monitor.didDrop()) return

        const {sourceNodeID, sourceParentID} = monitor.getItem()
        const targetNodeID = props.nodeID
        const targetParentID = props.parentID

        // TODO: more elaborated restrictions
        const draggingRestrictions = sourceNodeID != targetParentID

        if (draggingRestrictions)
            props.moveNode(sourceNodeID, sourceParentID, targetNodeID, targetParentID)

        return
    }
}

//TODO: So far, it's the only class I modified to have react-dnd, was it worthy?
//should I try sortable-hoc? or synthetic events? or html5?
class NodeItem extends Component {
    render() {
        const {node, nodeID, isDragging, connectDragSource, connectDropTarget, indexes} = this.props

        // Opacity for dragging
        const styles = {
            opacity: isDragging ? 0.5 : 1,
            paddingLeft: (0.6+2*(indexes.length-1))+'em'
        }

        // Show/Hide their children
        const childrenShouldBeRendered = node.childrenIDs.length > 0 && node.showChildren

        // Opened/Closed arrow
        let toggleArrow
        if(node.type!='useCaseStep')
            toggleArrow = <Icon type={node.showChildren ? 'OPENED' : 'CLOSED'}/>
        else
            toggleArrow = <Icon type='' color='transparent'/>

        return connectDragSource(connectDropTarget(
            <div>
                <li className={hoverTarget} onClick={()=>{this.props.handleToggle(node.nodeID)}}>
                    <div style={styles}>
                        {toggleArrow}
                        <Icon type={node.type}/>
                        <div>{node.title}</div>
                    </div>
                </li>
                {childrenShouldBeRendered &&
                    <NodeList childrenIDs={node.childrenIDs} indexes={indexes} parentID={nodeID}/>
                }
            </div>
        ))
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        node: state.entities[ownProps.nodeID]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleToggle: id => {
            dispatch(toggleNode(id))
        },
        moveNode: (sourceNodeID, sourceParentID, targetNodeID, targetParentID) => {
            dispatch(moveNode(sourceNodeID, sourceParentID, targetNodeID, targetParentID))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    DropTarget('item', dropTarget, connect => ({
        connectDropTarget: connect.dropTarget(),
    }))(DragSource('item', dragSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }))(NodeItem))
)
