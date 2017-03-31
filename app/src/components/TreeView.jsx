import React, {Component} from 'react'
import { connect } from 'react-redux'
import { moveNode } from '../actions'
import NodeList from './NodeList.jsx'

import {treeView} from '../styles/treeView.css'

class TreeView extends Component {
    render() {
        return (
            <div className={treeView}>
                { this.props.document && <NodeList
                    children={this.props.document.children}
                    moveNode={this.props.moveNode}
                    indexes={[]}/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    document: state.documents[state.switchDocument.navActiveTab]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      moveNode: (sourceDepth, targetDepth, sourceIndex, targetIndex, sourceIndexes, targetIndexes, active) => {
          dispatch(moveNode(sourceDepth, targetDepth, sourceIndex, targetIndex, sourceIndexes, targetIndexes, active))
          console.log(sourceDepth, targetDepth, sourceIndex, targetIndex, sourceIndexes, targetIndexes, active)
      }}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeView)
