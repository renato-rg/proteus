import React, {Component} from 'react'
import { connect } from 'react-redux'
import styles from './styles.css'
import Tag from '../display/Tag.jsx'

const DocView = (props) => {
    const {document} = props
    return (
        <div className={styles.background}>
            <div className={styles.page}>
                <div className={styles.doc}>
                { document ?
                    <DocNode node={document}/>
                    :
                    <span>Select a document...</span>
                }
                </div>
            </div>
        </div>
    )
}

const DocNode = (props) => {
    const { node } = props
    const childrenShouldBerendered = node.children!=undefined && (node.type=='document'||node.type=='folder')
    return (
        <div>
            <Tag node={node}/>
            {childrenShouldBerendered && node.children.map((item, index) =>
                <DocNode key={index} node={item}/>
            )}
        </div>
    )
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
)(DocView)
