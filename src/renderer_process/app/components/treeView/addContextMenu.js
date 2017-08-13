import { remote } from 'electron'
import React, {Component} from 'react'
import { connect } from 'react-redux'

import { deleteNode } from '../../state_manager/actions'

export default function addContextMenu(ComponentToModify) {

    // TODO: you may want to bring back here the redux locale i18n thingy since you
    // need redux to put in here the events related to the menu items
    // Thus, you may also want to make a HOC called withPlaceholder() so it can
    // pass a function prop placeholder('string'), which is actually the same
    // as the  i18n it just uses another json additionally

    class ComponentWithContextMenu extends Component {
        render() {
            const { __, deleteNode, parentID } = this.props
            const contextMenuHandler = e => {
                e.preventDefault()
                const nodeID = this.props.node.nodeID
                const template = [
                    {
                        label: __('Delete'),
                        click () {
                            deleteNode(nodeID, parentID)
                        }
                    },
                    { type: 'separator' },
                    {
                        label: __('Properties...'),
                        click () {
                            console.log('Attempt to edit properties in node with ID:'+nodeID)
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
            deleteNode: (nodeID, parentID) => {
                dispatch(deleteNode(nodeID, parentID))
            }
        }
    }
    return connect(null, mapDispatchToProps)(ComponentWithContextMenu)
}
