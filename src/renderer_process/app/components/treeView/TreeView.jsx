import React, {Component} from 'react'
import NodeList from './NodeList.jsx'

import {treeView} from './treeView.css'

class TreeView extends Component {
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

export default TreeView
