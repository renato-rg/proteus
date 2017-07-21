import React from 'react'
import { connect } from 'react-redux'
import { setTreeViewTab } from '../../state_manager/actions'
import Tabs from './Tabs.jsx'

const mapStateToProps = (state, ownProps) => {
    const active = state.switchDocument.navActiveTab
    const proj = state.appState.projectInfo
    const tabs = proj==undefined ? [] : proj.childrenIDs.map( nodeID => {
        return state.entities[nodeID].title
    })
    return {
        active,
        tabs
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handler: (index) => {
            dispatch(setTreeViewTab(index))
        }
    }
}

const TreeViewTabs = connect(mapStateToProps, mapDispatchToProps)(Tabs)

export default TreeViewTabs
