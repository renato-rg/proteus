import React, {Component} from 'react'
import NodeList from './NodeList.jsx'
import Icon from './icons/Icon.jsx'
import { DragSource, DropTarget } from 'react-dnd'
import {hoverTarget} from '../styles/treeView.css'

//Redux
import { toggleNode, moveNode } from '../actions'
import { connect } from 'react-redux'

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
class NodeItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showChildren: false
        }
        this.toggleFolder = this.toggleFolder.bind(this)
    }

    toggleFolder() {
        this.setState({showChildren: !this.state.showChildren})
    }

    render() {
        const {item, isDragging, connectDragSource, connectDropTarget, moveNode, indexes} = this.props
        const styles = {
            opacity: isDragging ? 0.5 : 1,
            paddingLeft: (0.6+2*(indexes.length-1))+'em'
        }
        const childrenShouldBeRendered = item.children!=undefined && this.state.showChildren //&& item.showChildren

        return connectDragSource(connectDropTarget(
            <div>
                <li className={hoverTarget} onClick={()=>{this.toggleFolder()}}>
                    <div style={styles}>
                        <Icon type={item.type}/>
                        <div>{item.title}</div>
                    </div>
                </li>
                {childrenShouldBeRendered &&
                    <NodeList children={item.children} moveNode={moveNode} indexes={indexes}/>
                }
            </div>
        ))
    }
}

const mapStateToProps = state => { return {} }

const mapDispatchToProps = dispatch => {
    return {
        handleToggle: () => {
            dispatch(toggleNode(''))
        },
        moveNode: (sourceDepth, targetDepth, sourceIndex, targetIndex, sourceIndexes, targetIndexes, active) => {
            dispatch(moveNode(sourceDepth, targetDepth, sourceIndex, targetIndex, sourceIndexes, targetIndexes, active))
            console.log(sourceDepth, targetDepth, sourceIndex, targetIndex, sourceIndexes, targetIndexes, active)
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
