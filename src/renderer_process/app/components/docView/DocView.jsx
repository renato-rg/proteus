import React from 'react'
import { connect } from 'react-redux'
import styles from './styles.css'
import Tag from '../display/Tag.jsx'

const DocView = props => {
    const  {docNode} = props
    return (
        <div className={styles.background}>
            <div className={styles.page}>
                <div className={styles.doc}>
                { docNode ?
                    <DocNode nodeID={docNode.nodeID}/>
                    :
                    <span>Select a document...</span>
                }
                </div>
            </div>
        </div>
    )
}

let DocNode = props => {
    const { node } = props
    const childrenShouldBerendered = node.childrenIDs && node.childrenIDs.length>0 && (node.type=='document'||node.type=='folder')
    return (
        <div>
            <Tag node={node}/>
            {childrenShouldBerendered && node.childrenIDs.map((nodeID, index) =>
                <DocNode key={index} nodeID={nodeID}/>
            )}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        node : state.entities[ownProps.nodeID]
    }
}
DocNode = connect(mapStateToProps, null)(DocNode)

export default DocView
