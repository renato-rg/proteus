import React, {Component} from 'react'
import NodeLabel from './NodeLabel.jsx'
import { connect } from 'react-redux'

import {treeView} from './treeView.css'

export default class TreeView extends Component {
    render() {
        const  {docNode} = this.props
        
        return (
            <div className={treeView}>
                { docNode &&
                    <div>
                        <NodeList childrenIDs={docNode.childrenIDs} parentID={docNode.nodeID}
                            parentType={docNode.type} depth={0}/>
                    </div>
                }
            </div>
        )
    }
}

class NodeList extends Component {
    render() {
        const {childrenIDs, parentID, parentType, depth} = this.props

        return (
            <ul>
                {childrenIDs.map((childID, index) => {
                    return <NodeItemWrapper nodeID={childID} key={index} depth={depth+1}
                        parentID={parentID} parentType={parentType}/>
                })}
            </ul>
        )
    }
}

class NodeItem extends Component {

    render() {
        const {node, parentID, parentType, depth} = this.props
        const childrenShouldBeRendered = node.childrenIDs && node.childrenIDs.length > 0 && node.showChildren

        return (
            <div>
                <NodeLabel {...{node, parentID, parentType, depth}}/>
                {childrenShouldBeRendered &&
                    <NodeList childrenIDs={node.childrenIDs} parentID={node.nodeID}
                        parentType={node.type} depth={depth} visible={childrenShouldBeRendered}/>
                }
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        node: state.entities[ownProps.nodeID]
    }
}
const NodeItemWrapper = connect(mapStateToProps, null)(NodeItem)
