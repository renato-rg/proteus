import { remote } from 'electron'
import React, {Component} from 'react'
import { connect } from 'react-redux'

import { deleteNode, openNodeProperties, setDetailedNodeID } from '../../state_manager/actions'

export default function addContextMenu(ComponentToModify) {

    // TODO: you may want to bring back here the redux locale i18n thingy since you
    // need redux to put in here the events related to the menu items
    // Thus, you may also want to make a HOC called withPlaceholder() so it can
    // pass a function prop placeholder('string'), which is actually the same
    // as the  i18n it just uses another json additionally

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
