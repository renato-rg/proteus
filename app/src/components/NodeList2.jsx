import React, {Component} from 'react'
import NodeItem2 from './NodeItem2.jsx'
import update from 'immutability-helper'

class NodeList2 extends Component {
    render() {
        return (
            <ul>
                {this.props.children.map((item, index) =>{
                    const indexes = this.props.indexes.slice()
                    indexes.push(index)
                    return <NodeItem2 item={item} key={index} indexes={indexes} moveNode={this.props.moveNode}/>
                })}
            </ul>
        )
    }
}

export default NodeList2
