import React, {Component} from 'react'
import NodeLabel from './NodeLabel.jsx'
import NodeList from './NodeList.jsx'

//Redux
import { connect } from 'react-redux'

class NodeItem extends Component {

    render() {
        const {node, parentID, parentAcceptedChildren, depth} = this.props
        const childrenShouldBeRendered = node.childrenIDs && node.childrenIDs.length > 0 && node.showChildren

        return (
            <div>
                <NodeLabel {...{node, parentID, parentAcceptedChildren, depth}}/>
                {childrenShouldBeRendered &&
                    <NodeList childrenIDs={node.childrenIDs} parentID={node.nodeID}
                        parentAcceptedChildren={node.acceptedChildren} depth={depth}/>
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

export default connect(mapStateToProps, null)(NodeItem)
