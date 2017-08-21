import React from 'react'
import { updateEditableField } from '../../state_manager/actions'
import { connect } from 'react-redux'
import Editable2 from '../editable/Editable2.jsx'
import styles from './styles.css'
import i18n from '../../i18n'

import entity from '../../constants/entity'
const sections = entity('useCase')

const UseCase = props => {
    const { node, childrenNodes, update, __ } = props

    const updateIn = fieldPath => event => {
        update(node.nodeID, fieldPath, event.target.value)
    }

    return <div className={styles.useCase}>
        <table>
            <thead>
                <tr>
                    <th>{__('UC')}</th>
                    <td>
                        <Editable2 className={styles.paragraph}
                                    value={node.title}
                                    introForbidden
                                    callback={updateIn(['title'])}/>
                    </td>
                </tr>
            </thead>
            <tbody>
                {Object.keys(sections)
                .filter(s => s !== 'traces')
                .map( section =>
                    Object.keys(sections[section])
                    .filter(p => node[section][p] && node[section][p] !== '')
                    .map( property =>
                        <tr key={property}>
                            <th>{__(property)}</th>
                            <td>
                                <Editable2 className={styles.paragraph}
                                            value={node[section][property]}
                                            introForbidden={sections[section][property]==='oneline'}
                                            callback={updateIn([section, property])}/>
                            </td>
                        </tr>
                    )
                )
                }
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
                                    <th>{index+1}</th>
                                    <td>
                                        <Editable2 className={styles.paragraph}
                                                    value={step.title}
                                                    callback={updateIn(step.nodeID, ['title'])}/>
                                    </td>
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
