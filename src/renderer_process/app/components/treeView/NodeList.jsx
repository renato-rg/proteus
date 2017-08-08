import React, {Component} from 'react'
import NodeItem from './NodeItem.jsx'

class NodeList extends Component {
    render() {
        const {childrenIDs, parentID, parentAcceptedChildren, depth} = this.props

        return (
            <ul>
                {childrenIDs.map((childID, index) => {
                    return <NodeItem nodeID={childID} key={index} depth={depth+1}
                        parentID={parentID} parentAcceptedChildren={parentAcceptedChildren}/>
                })}
            </ul>
        )
    }
}

export default NodeList
