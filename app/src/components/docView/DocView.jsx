import React, {Component} from 'react'
import { connect } from 'react-redux'
import styles from './styles.css'
import Tag from '../display/Tag.jsx'

const DocView = (props) => {
    const {documentID} = props
    return (
        <div className={styles.background}>
            <div className={styles.page}>
                <div className={styles.doc}>
                { documentID ?
                    <DocNode nodeID={documentID}/>
                    :
                    <span>Select a document...</span>
                }
                </div>
            </div>
        </div>
    )
}

let DocNode = (props) => {
    const { node, nodeID } = props
    const childrenShouldBerendered = node.childrenIDs.length>0 && (node.type=='document'||node.type=='folder')
    return (
        <div>
            <Tag node={node}/>
            {childrenShouldBerendered && node.childrenIDs.map((nodeID, index) =>
                <DocNode key={index} nodeID={nodeID}/>
            )}
        </div>
    )
}

const mapStateToProps1 = (state, ownProps) => {
    const node = state.project[ownProps.nodeID]
    return {
        node: node
    }
}
const mapDispatchToProps1 = (dispatch, ownProps) => {
    return {}
}
DocNode = connect(
    mapStateToProps1,
    mapDispatchToProps1
)(DocNode)

//////////////////////////////////////////////////////

const mapStateToProps = (state, ownProps) => {
    const proj = state.project['PROJECT']
    const documentID = proj==undefined ? undefined :
        state.project['PROJECT'].childrenIDs[state.switchDocument.navActiveTab]
    return {
        documentID
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DocView)
