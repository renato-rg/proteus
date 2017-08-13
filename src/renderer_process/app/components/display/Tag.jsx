import React from 'react'
import { updateEditableField } from '../../state_manager/actions'
import { connect } from 'react-redux'
import styles from './styles.css'
import UseCase from './UseCase.jsx'

import Editable2 from '../editable/Editable2.jsx'

const Tag = props => {
    const { node, update } = props
    const updateFieldInExperimental = fieldPath => event => {
        update(node.nodeID, fieldPath, event.target.value)
    }
    switch (node.type) {

        // DOCUMENT
        case 'document':
            return <Editable2 className={styles.title}
                        value={node.title}
                        type={node.type}
                        introForbidden
                        callback={updateFieldInExperimental(['title'])}/>

        // FOLDER
        case 'folder':
            return <Editable2 className={styles.folder}
                        value={node.title}
                        type={node.type}
                        introForbidden
                        callback={updateFieldInExperimental(['title'])}/>

        // USE CASE
        case 'useCase':
            return <UseCase node={node}/>

        // PARAGRAPH
        case 'paragraph':
            return <Editable2 className={styles.paragraph}
                        value={node.title}
                        type={node.type}
                        callback={updateFieldInExperimental(['title'])}/>

        // OTHER
        default:
            return <div className={styles.folder}>
                <span>{node.title}</span>
            </div>
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
    null,
    mapDispatchToProps
)(Tag)
