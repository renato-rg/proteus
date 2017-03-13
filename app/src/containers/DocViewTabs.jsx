import React from 'react'
import { connect } from 'react-redux'
import { setDocViewTab } from '../actions'
import Tabs from '../components/Tabs.jsx'

const mapStateToProps = (state, ownProps) => {
    return {
        active: state.switchDocument.sectionActiveTab
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handler: (index) => {
            dispatch(setDocViewTab(index))
        }
    }
}

const DocViewTabs = connect(mapStateToProps, mapDispatchToProps)(Tabs)

export default DocViewTabs
