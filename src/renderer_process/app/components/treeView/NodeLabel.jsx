import React, {Component} from 'react'
import Icon from '../icons/Icon.jsx'
import {hoverTarget} from './treeView.css'
import i18n from '../../i18n'
import resolveREMIcon from '../icons/resolveREMIcon'

const placeholders = require('../../constants/placeholders.json')

//Redux
import { toggleNode, moveNode, createNode } from '../../state_manager/actions'
import { connect } from 'react-redux'

//Drag and Drop
import makeItDroppable from './makeItDroppable'
import makeItDraggable from './makeItDraggable'
import addContextMenu from './addContextMenu'

class NodeLabel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dropEffect: 'move',
            styles: {}
        }
        this.updateCSSEffect = this.updateCSSEffect.bind(this)
        this.updateDropEffectTo = this.updateDropEffectTo.bind(this)
    }

    updateCSSEffect(dropEffect, direction) {
        let styles
        if (dropEffect === 'none')
            styles = {}
        else {
            styles = direction ==='MID' ?
                { color: '#5cbd5b' } :
                { background:`linear-gradient(to ${direction}, transparent 88%,`+
                    'rgba(78, 195, 222, 0.13) 93%, rgb(29, 139, 179) 100%)'}
        }
        this.setState({ styles })
    }

    updateDropEffectTo(dropEffect) {
        this.setState({ dropEffect })
    }

    render() {
        const {__, node, depth, toggleNode, isDragging, isOver,
                connectDragSource, connectDropTarget} = this.props

        // Opacity for dragging
        const styles = Object.assign({
            opacity: isDragging ? 0.5 : 1
        }, isOver ? this.state.styles : {})
        const padding = {
            paddingLeft: 19*(depth-1) + 'px',
            height: '28px'
        }

        const label = {
            marginLeft: '5px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }

        // Opened/Closed arrow
        const arrowType = node.type==='folder' ? (node.showChildren ? 'SECTION_OPENED' : 'SECTION_CLOSED') : ''
        const arrowStyle = node.type==='folder' ? (node.showChildren ? {} : {transform: 'rotate(-45deg)', paddingRight: '3px'}) : {}
        const arrowSize = (node.type==='folder' && node.showChildren) ? '7px': '8px'

        const short = 'short_of_'+node.type
        const id = __(short) === short ? '' : `[${__(short)}] `


        return connectDragSource(connectDropTarget(
            <li className={hoverTarget} style={styles} ref={nodeRef => this.nodeRef = nodeRef}
                onContextMenu={this.props.contextMenuHandler}
                onDoubleClick={this.props.showPropertiesPanel}
                onClick={toggleNode}>
                <div style={padding}>
                    <Icon containerSize='22px' type={arrowType} size={arrowSize} styles={arrowStyle}/>
                    <img src={resolveREMIcon(node.type)}/>
                    <div style={label}>{ id }{ node.title }</div>
                </div>
            </li>
        ), {dropEffect: this.state.dropEffect})
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleNode: () => {
            dispatch(toggleNode(ownProps.node.nodeID))
        },
        moveNode: (direction, sourceNodeID, sourceParentID) => {
            dispatch(moveNode(direction, sourceNodeID, sourceParentID,
                                ownProps.node.nodeID, ownProps.parentID))
        },
        createNode: (nodeType, direction, nodeID, parentID) => {
            dispatch(createNode(nodeType, direction, nodeID, parentID))
        }
    }
}

export default connect(null, mapDispatchToProps)(i18n(addContextMenu(makeItDraggable(makeItDroppable(NodeLabel)))))
