import React from 'react'
import { updateEditableField, toggleTableRow } from '../../state_manager/actions'
import { connect } from 'react-redux'
import TableWithMenu from './TableWithMenu'


const TableWrapper = props => {
    return <TableWithMenu
                sections={Object.keys(props.scheme||{})}
                scheme={props.scheme}
                table={props.node}
                prefix ={props.prefix}
                update={props.update}
                toggleRow={props.toggleRow(props.scheme)}
            />
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        update: payload => {
            console.log({payload})
            if (payload.propName)
                dispatch(updateEditableField(ownProps.node.nodeID, [payload.propName], payload.newValue))
            else if (payload.fieldName)
                dispatch(updateEditableField(ownProps.node.nodeID, ['fields', payload.fieldName], payload.newValue))
        },
        toggleRow: scheme => rowName => {            
            dispatch(toggleTableRow(ownProps.node.nodeID, scheme, rowName))
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        prefix: state.classes.details[ownProps.node.type].prefix,
        scheme: state.classes.details[ownProps.node.type].scheme
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableWrapper)
