import { remote } from 'electron'
import React, {Component} from 'react'
import { connect } from 'react-redux'

import { deleteNode, openNodeProperties, setDetailedNodeID } from '../../state_manager/actions'

export default function addContextMenu(ComponentToModify) {

    class ComponentWithContextMenu extends Component {
        render() {
            const { __, deleteNode, showPropertiesPanel } = this.props
            const contextMenuHandler = e => {
                e.preventDefault()
                const template = [
                    {
                        label: __('Delete'),
                        click () {
                            deleteNode()
                        }
                    },
                    { type: 'separator' },
                    {
                        label: __('Properties...'),
                        click () {
                            showPropertiesPanel()
                        }
                    }
                ]
                remote.Menu.buildFromTemplate(template).popup()
            }
            return <ComponentToModify {...this.props} {...this.state} contextMenuHandler={contextMenuHandler}/>
        }
    }
    const mapDispatchToProps = (dispatch, ownProps) => {
        return {
            deleteNode: () => {
                dispatch(deleteNode(this.props.node.nodeID, this.props.parentID))
            },
            showPropertiesPanel: () => {
                dispatch(setDetailedNodeID(ownProps.node.nodeID))
                dispatch(openNodeProperties())
            }
        }
    }
    return connect(null, mapDispatchToProps)(ComponentWithContextMenu)
}
