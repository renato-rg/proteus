import React, {Component} from 'react'
import NodeItem from './NodeItem.jsx'
import update from 'immutability-helper'

class NodeList extends Component {
    render() {
        return (
            <ul>
                {this.props.children.map((item, index) =>{
                    const indexes = this.props.indexes.slice()
                    indexes.push(index)
                    return <NodeItem item={item} key={index} indexes={indexes}/>
                })}
            </ul>
        )
    }
}

export default NodeList
