import React, {Component} from 'react'
import NodeItem from './NodeItem.jsx'

class NodeList extends Component {
    render() {
        const {childrenIDs, parentID, parentType, depth} = this.props

        return (
            <ul>
                {childrenIDs.map((childID, index) => {
                    return <NodeItem nodeID={childID} key={index} depth={depth+1}
                        parentID={parentID} parentType={parentType}/>
                })}
            </ul>
        )
    }
}

export default NodeList
