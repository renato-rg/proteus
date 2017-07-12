import React, {Component} from 'react'
import { connect } from 'react-redux'
import NodeItem from './NodeItem.jsx'

import {treeView} from './treeView.css'

// TODO: combinar con TreeViewTabs.jsx porque usan los mismos recursos de Redux
class TreeView extends Component {
    render() {
        return (
            <div className={treeView}>
                { this.props.nodeID &&
                    <NodeItem nodeID={this.props.nodeID} indexes={[this.props.docIndex]}/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const index = state.switchDocument.navActiveTab
    const proj = state.project['PROJECT']
    const node = proj!=undefined ? proj.childrenIDs[index] : undefined
    return {
        docIndex: index,
        project: proj,
        nodeID: node
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeView)
