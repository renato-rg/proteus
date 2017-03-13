import React from 'react'
import { connect } from 'react-redux'
import { setTreeViewTab } from '../actions'
import Tabs from '../components/Tabs.jsx'

const mapStateToProps = (state, ownProps) => {
    return {
        active: state.switchDocument.navActiveTab
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
