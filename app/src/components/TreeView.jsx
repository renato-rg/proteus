import React, {Component} from 'react'
import {render} from 'react-dom'
import NodeItem from './NodeItem.jsx'
import NodeList from './NodeList.jsx'

class TreeView extends Component {
    render() {
        return (
            <div className="treeView">
                <NodeList
                    children={this.props.document.children}
                    moveNode={this.props.moveNode}
                    indexes={[]}/>
            </div>
        )
    }
}

export default TreeView
