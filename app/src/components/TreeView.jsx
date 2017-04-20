import React, {Component} from 'react'
import { connect } from 'react-redux'
import {} from '../actions'
import NodeList from './NodeList.jsx'

import {treeView} from '../styles/treeView.css'

class TreeView extends Component {
    render() {
        return (
            <div className={treeView}>
                { this.props.document && <NodeList
                    children={this.props.document.children}
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
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeView)
