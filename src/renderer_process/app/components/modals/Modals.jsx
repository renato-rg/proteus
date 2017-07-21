import React, {Component} from 'react'
import { connect } from 'react-redux'
import NewProjectModal from './NewProjectModal.jsx'

const Modals = (props) => {
    switch (props.currentModal) {
        case 'NEW_PROJECT':
            return <NewProjectModal/>
        default:
            return null
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentModal: state.currentModal
    }
}

export default connect(mapStateToProps)(Modals)
