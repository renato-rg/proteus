import React from 'react'
import { updateEditableField } from '../../state_manager/actions'
import { connect } from 'react-redux'
import Editable from '../editable/Editable.jsx'
import styles from './styles.css'
import i18n from '../../i18n'

import propTypes from '../../constants/propTypes/'
import referenceByTitle from '../../constants/referenceByTitle.json'

const table = {
    borderCollapse: 'collapse',
    border: '1px solid rgb(221, 221, 221)'
}
const tdBordersAndPadding = {
    border: '1px solid rgb(221, 221, 221)',
    padding: '4px 8px',
    whiteSpace: 'nowrap'
}
const thBordersAndPadding = {
    border: '1px solid rgb(221, 221, 221)',
    padding: '4px 8px',
    whiteSpace: 'nowrap'
}
const headerColor = {
    backgroundColor: '#f5f5f5'
}

const UseCase = props => {
    const { node, update, __ } = props
    const { type } = node
    const sections = propTypes(type)
    const refByTitle = referenceByTitle[type]

    const updateIn = fieldPath => newValue => {
        update(node.nodeID, fieldPath, newValue)
    }

    const fontStyle = {
        fontFamily: 'inherit'
    }

    return <div className={styles.useCase}>
        <table style={table}>
            <thead>
                <tr style={headerColor}>
                    <th style={thBordersAndPadding}>{__(refByTitle?type:'short_of_'+type)}</th>
                    <td style={tdBordersAndPadding}>
                        <Editable type='oneline'
                            style={fontStyle}
                            placeholder='...'
                            className={styles.editable}
                            onChange={updateIn(['title'])}
                            value={node.title}
                        />
                    </td>
                </tr>
            </thead>
            <tbody>
                {Object.keys(sections)
                .filter(s => node.hasOwnProperty(s))
                .map( section =>
                    Object.keys(sections[section])
                    .filter(p => node[section].hasOwnProperty(p))
                    .map( property =>
                        <tr key={property}>
                            <th  style={thBordersAndPadding}>{__(property)}</th>
                            <td  style={tdBordersAndPadding}>
                                <Editable type={sections[section][property]}
                                    style={fontStyle}
                                    placeholder='...'
                                    className={styles.editable}
                                    onChange={updateIn([section, property])}
                                    value={node[section][property]}
                                />
                            </td>
                        </tr>
                    )
                )
                }
            </tbody>
        </table>
    </div>
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        update: (nodeID, fieldPath, newValue) => {
            dispatch(updateEditableField(nodeID, fieldPath, newValue))
        }
    }
}

export default connect(null, mapDispatchToProps)( i18n( UseCase ) )
