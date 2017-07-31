import React from 'react'
import { updateEditableField } from '../../state_manager/actions'
import { connect } from 'react-redux'
import Editable from '../editable/Editable.jsx'
import styles from './styles.css'
import i18n from '../../i18n'

const UseCase = props => {
    const { node, childrenNodes, update, __ } = props

    const updateFieldIn = fieldPath => event => {
        update(node.nodeID, fieldPath, event.target.innerText)
    }

    const updateInnerFieldIn = (nodeID, fieldPath) => event => {
        update(nodeID, fieldPath, event.target.innerText)
    }

    return <div className={styles.useCase}>
        <table>
            <thead>
                <tr>
                    <th>{__('UC')}</th>
                    <Editable type='td' callback={updateFieldIn(['title'])}>
                        {node.title}
                    </Editable>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>{__('Description')}</th>
                    <Editable type='td' callback={updateFieldIn(['properties', 'details', 'description'])}>
                        {node.properties.details.description}
                    </Editable>
                </tr>
                <tr>
                    <th>{__('Secuence')}</th>
                    <td>
                        <table>
                            <thead>
                                <tr>
                                    <th>{__('Step')}</th>
                                    <th>{__('Action')}</th>
                                </tr>
                            </thead>
                            <tbody>
                            {childrenNodes.map((step, index) =>
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <Editable type='td' callback={updateInnerFieldIn(step.nodeID, ['title'])}>
                                        {step.title}
                                    </Editable>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
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
)(i18n(UseCase))
