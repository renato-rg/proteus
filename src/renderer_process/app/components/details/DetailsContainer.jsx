import { connect } from 'react-redux'
import { closeNodeProperties, updateEditableField, includeField } from '../../state_manager/actions'
import i18n from '../../i18n'

// Components
import Details from './Details.jsx'

const mapStateToProps = (state, ownProps) => {
    const detailsNodeID = state.switchDocument.detailsNodeID
    const node = state.entities[detailsNodeID]

    return {
        node
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        hidePropertiesPanel: () => {
            dispatch(closeNodeProperties())
        },
        update: (nodeID, fieldPath, newValue) => {
            dispatch(updateEditableField(nodeID, fieldPath, newValue))
        },
        includeField: (nodeID, section, property, include) => {
            dispatch(includeField(nodeID, section, property, include))
        }
    }
}

const DetailsContainer = connect(mapStateToProps, mapDispatchToProps)(i18n(Details))

export default DetailsContainer
