import React, {Component} from 'react'
import NodeItem from './NodeItem.jsx'
import update from 'immutability-helper'

class NodeList extends Component {
    render() {
        return (
            <ul>
                {this.props.childrenIDs.map((nodeID, index) =>{
                    const indexes = this.props.indexes.slice()
                    indexes.push(index)
                    return <NodeItem nodeID={nodeID} key={index} indexes={indexes} parentID={this.props.parentID} />
                })}
            </ul>
        )
    }
}

export default NodeList
