import React, {Component} from 'react'
import {hoverTarget} from './treeView.css'

//Redux
import { toggleNode, moveNode, createNode, setDraggingData } from '../../state_manager/actions'
import { connect } from 'react-redux'

//Drag and Drop
import addContextMenu from './addContextMenu'

const SectionOpened = require('react-icons/lib/md/signal-cellular-4-bar')
const SectionClosed = require('react-icons/lib/md/signal-cellular-null')

// Dragging area relative to target component's size
const calculateSection = (height, top, y) => {
    if (y < top + height * .25)
        return 'TOP'
    else if (y < top + height * .75)
        return 'MID'
    else
        return 'BOTTOM'
}

class NodeLabel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            styles: {}
        }
        this.updateCSSEffect = this.updateCSSEffect.bind(this)
        this.onDragOver = ev => {
            ev.preventDefault()
            const {height, top} = this.nodeRef.getBoundingClientRect()
            const section = calculateSection(height, top, ev.clientY)
            const { fromToolbar, sourceType, sourceNodeID } = this.props.dragStore
            const targetNodeType = section === 'MID' ? this.props.node.type : this.props.parentType            
            const acceptedChildren = this.props.classes.details[targetNodeType].acceptedChildren || []
            
            let isDropAllowed = acceptedChildren === 'all' || acceptedChildren.indexOf(sourceType) > -1
            if (!fromToolbar && isDropAllowed){
                isDropAllowed = sourceNodeID !== this.props.parentID
                                && sourceNodeID !== this.props.node.nodeID
            }

            const effect = isDropAllowed ? (fromToolbar ? 'copy' : 'move') : 'none'
            ev.dataTransfer.dropEffect = effect

            this.updateCSSEffect(effect, section)
        }
        this.onDrop = ev => {
            const {height, top} = this.nodeRef.getBoundingClientRect()
            const section = calculateSection(height, top, ev.clientY)
            const { fromToolbar, sourceType, sourceNodeID, sourceParentID } = this.props.dragStore
            if (fromToolbar)
                this.props.createNode(sourceType, section, this.props.node.nodeID, this.props.parentID, this.props.classes.details)
            else
                this.props.moveNode(section, sourceNodeID, sourceParentID)
            this.setState({styles: {}})
        }
        
        this.onDragStart = () => {
            this.props.setDraggingData({
                sourceType: this.props.node.type,
                sourceNodeID: this.props.node.nodeID,
                sourceParentID: this.props.parentID,
            })
        }
        this.onDragLeave = ev => {
            this.setState({styles: {}})
        }
    }

    updateCSSEffect(dropEffect, section) {
        const {borderBottom, borderTop} = this.state.styles
        if (borderBottom && section === 'BOTTOM') return
        if (borderTop && section === 'TOP') return
        if (!borderTop && !borderBottom && section == 'MID') return
        
        const styles = {}
        if (dropEffect != 'none' && section === 'TOP' && !borderTop)
            styles.borderTop = '1px dashed #1ab8b9'
        else if (dropEffect != 'none' && section === 'BOTTOM' && !borderBottom)
            styles.borderBottom = '1px dashed #1ab8b9'
        else if (dropEffect != 'none' && section === 'MID')
            styles.color = '#1ab8b9'
        
        this.setState({styles})
    }

    render() {
        const {node, depth, toggleNode, } = this.props

        // Opacity for dragging
        const styles = Object.assign({
            userSelect: 'none',
            cursor: 'default',
            borderTop: '1px dashed transparent',
            borderBottom: '1px dashed transparent',            
            paddingLeft: 19*(depth-1) + 'px'
        }, this.state.styles)


        const label = {
            marginLeft: '5px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }

        const brackets = ['folder', 'image', 'paragraph'].indexOf(node.type) < 0 ?
                        '['+((this.props.classes.details[node.type]||{}).prefix || '???')+'-'+(node.ref || '???')+'] '
                        : ''

        return (
            <li key={this.props.node.nodeID} className={hoverTarget} style={styles} ref={nodeRef => this.nodeRef = nodeRef}
                onContextMenu={this.props.contextMenuHandler}
                onDoubleClick={this.props.showPropertiesPanel}
                onClick={toggleNode}

                draggable
                onDragStart={this.onDragStart}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
                onDragLeave={this.onDragLeave}
            >
                <Arrow isContainer={((this.props.classes.details[node.type]||{}).acceptedChildren||[]).length>0}
                        isOpened={node.showChildren}/>
                <img src={this.props.classes.details[node.type].image} style={{height: '16px', width:' 16px'}} draggable='false'/>
                <div style={label}>{ brackets }{ node.title }</div>
            </li>
        )
    }
}

const Arrow = ({isContainer, isOpened}) => {
    if (!isContainer)
        return <div style={{minWidth: '17px'}}/>    
    if (isOpened)
        return <SectionOpened size='7px' style={{padding: '0px 5px'}}/>    
    return <SectionClosed size='7px' style={{transform: 'rotate(-45deg)', padding: '0px 5px'}}/>
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setDraggingData: payload => dispatch(setDraggingData(payload)),
        toggleNode: () => dispatch(toggleNode(ownProps.node.nodeID)),
        moveNode: (direction, sourceNodeID, sourceParentID) => {
            dispatch(moveNode(direction, sourceNodeID, sourceParentID, ownProps.node.nodeID, ownProps.parentID))
        },
        createNode: (sourceType, direction, nodeID, parentID, entities) => {
            dispatch(createNode(sourceType, direction, ownProps.node.nodeID, ownProps.parentID, entities))
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        projectPath: state.appState.projectPath,
        dragStore: state.dragStore,
        classes: state.classes
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(addContextMenu(NodeLabel))
