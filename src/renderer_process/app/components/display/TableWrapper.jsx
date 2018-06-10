import React from 'react'
import { updateEditableField } from '../../state_manager/actions'
import { connect } from 'react-redux'
import SimpleTable from './SimpleTable'


const TableWrapper = props => {
    return <SimpleTable
                table={props.node}
                prefix ={props.prefix}
                update={props.update}
            />
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        update: payload => {
            if (payload.propName)
                dispatch(updateEditableField(ownProps.node.nodeID, [payload.propName], payload.newValue))
            else if (payload.fieldName)
                dispatch(updateEditableField(ownProps.node.nodeID, ['fields', payload.fieldName], payload.newValue))
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        prefix: state.classes.details[ownProps.node.type].prefix
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableWrapper)
