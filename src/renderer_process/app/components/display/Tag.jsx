import React from 'react'
import { updateEditableField } from '../../state_manager/actions'
import { connect } from 'react-redux'
import styles from './styles.css'
import UseCase from './UseCase.jsx'

import Editable from '../editable/Editable.jsx'

const Tag = (props) => {
    const { node, update } = props
    const updateFieldIn = fieldPath => event => {
        update(node.nodeID, fieldPath, event.target.innerText)
    }
    switch (node.type) {

        // DOCUMENT
        case 'document':
            return <div className={styles.title}>
                <Editable callback={updateFieldIn(['title'])}>
                    {node.title}
                </Editable>
            </div>

        // FOLDER
        case 'folder':
            return <div className={styles.folder}>
                <Editable callback={updateFieldIn(['title'])}>
                    {node.title}
                </Editable>
            </div>

        // USE CASE
        case 'useCase':
            return <UseCase node={node}/>

        // PARAGRAPH
        case 'paragraph':
            return <div className={styles.paragraph}>
                <p>{node.title}</p>
            </div>

        // OTHER
        default:
            return <div className={styles.folder}>
                <span>{node.title}</span>
            </div>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        childrenNodes: ownProps.node.childrenIDs.map( n => state.entities[n] )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        update: (nodeID, fieldPath, newValue) => {
            dispatch(updateEditableField(nodeID, fieldPath, newValue))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tag)
