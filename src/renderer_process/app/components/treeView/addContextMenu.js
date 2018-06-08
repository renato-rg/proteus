import { remote } from 'electron'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {translate as __} from '../../i18n'

import { deleteNode, pushTab } from '../../state_manager/actions'

export default function addContextMenu(ComponentToModify) {

    class ComponentWithContextMenu extends Component {
        render() {
            const { deleteNode, node, parentID, pushTab } = this.props
            const contextMenuHandler = e => {
                e.preventDefault()
                const template = [
                    {
                        label: __('DELETE'),
                        click () {
                            deleteNode(node.nodeID, parentID)
                        }
                    },
                    {
                        label: __('EDIT_PROPERTIES'),
                        click () {
                            pushTab(node.nodeID, true)
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
            deleteNode: (nodeID, parentID) => dispatch(deleteNode(nodeID, parentID)),
            pushTab: (id, focus) => dispatch(pushTab(id, focus))
        }
    }
    return connect(null, mapDispatchToProps)(ComponentWithContextMenu)
}
