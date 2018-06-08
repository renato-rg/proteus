import React from 'react'
import { updateEditableField } from '../../state_manager/actions'
import { connect } from 'react-redux'
import styles from './styles.css'
import Editable from '../editable/Editable.jsx'
import TableWrapper from './TableWrapper'


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
    const { node, update } = props
    const updateFieldInExperimental = fieldPath => newValue => {
        update(node.nodeID, fieldPath, newValue)
    }
    const type = node.type

    if (type === 'document') {
        return <Editable type='oneline'
                        style={title}
                        placeholder='...'
                        className={styles.shadow+' '+styles.editable}
                        value={node.title}
                        onChange={updateFieldInExperimental(['title'])}/>
    }

    else if (type === 'folder') {
        return <Editable type='oneline'
                        style={folder}
                        placeholder='...'
                        className={styles.shadow+' '+styles.editable}
                        value={node.title}
                        onChange={updateFieldInExperimental(['title'])}/>
    }

    else if (props.tableTypes.indexOf(type) > -1)
        return <TableWrapper node={node}/>

    else if (type === 'paragraph') {
        return <Editable type='multiline'
                        style={paragraph}
                        placeholder='...'
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

const mapStateToProps = state => {
    return {
        tableTypes: Object.keys(state.classes.details).filter(e => ['folder', 'paragraph', 'image'].indexOf(e) < 0)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tag)
