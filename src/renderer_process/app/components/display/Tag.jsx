import React from 'react'
import { updateEditableField } from '../../state_manager/actions'
import { connect } from 'react-redux'
import styles from './styles.css'
import UseCase from './UseCase.jsx'
import i18n from '../../i18n'
import Editable from '../editable/Editable.jsx'


const placeholders = require('../../constants/placeholders.json')
const tableTypes = require('../../constants/tableTypes.json')

const paragraph = {
    textAlign: 'justify',
    lineHeight: '15pt',
    fontSize: '12pt',
    fontFamily: 'Calibri',
    marginBottom: '6pt'
}

const title = {
    marginBottom: '18pt',
    fontFamily: '"Crimson Text", serif',
    fontSize: '20pt',
    textAlign: 'center'
}

const folder = {
    textAlign: 'justify',
    verticalAlign: 'middle',
    fontFamily: '"Crimson Text", serif',
    fontSize: '14pt',
    marginBottom: '12pt'
}

const Tag = props => {
    const { __, node, update } = props
    const updateFieldInExperimental = fieldPath => newValue => {
        update(node.nodeID, fieldPath, newValue)
    }
    const type = node.type

    if (type === 'document') {
        return <Editable type='oneline'
                        style={title}
                        placeholder={'<'+__(placeholders[node.type])+'>'}
                        className={styles.shadow+' '+styles.editable}
                        value={node.title}
                        onChange={updateFieldInExperimental(['title'])}/>
    }

    else if (type === 'folder') {
        return <Editable type='oneline'
                        style={folder}
                        placeholder={'<'+__(placeholders[node.type])+'>'}
                        className={styles.shadow+' '+styles.editable}
                        value={node.title}
                        onChange={updateFieldInExperimental(['title'])}/>
    }

    else if (tableTypes.indexOf(type) > -1)
        return <UseCase node={node}/>

    else if (type === 'paragraph') {
        return <Editable type='multiline'
                        style={paragraph}
                        placeholder={'<'+__(placeholders[node.type])+'>'}
                        className={styles.shadow+' '+styles.editable}
                        value={node.title}
                        onChange={updateFieldInExperimental(['title'])}/>
    }

    else {
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
)(i18n(Tag))
