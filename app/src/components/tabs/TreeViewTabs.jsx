import React from 'react'
import { connect } from 'react-redux'
import { setTreeViewTab } from '../../actions'
import Tabs from './Tabs.jsx'

const mapStateToProps = (state, ownProps) => {
    const active = state.switchDocument.navActiveTab
    const proj = state.project['PROJECT']
    const tabs = proj==undefined ? [] : proj.childrenIDs.map( nodeID => {
        return state.project[nodeID].title
    })
    return {
        active: active,
        tabs: tabs
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handler: (index) => {
            console.log(index);
            dispatch(setTreeViewTab(index))
        }
    }
}

const TreeViewTabs = connect(mapStateToProps, mapDispatchToProps)(Tabs)

export default TreeViewTabs
