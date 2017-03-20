import React from 'react'
import { openModal } from '../../actions'
import { connect } from 'react-redux'
import {modal, labels, fields, title, form, controls} from './styles.css'

const NewProjectModal = (props) => {
    const handleBackgroundClick = e => {
        if (e.target === e.currentTarget) props.closeModal()
    }
    return (
        <div className={modal} onClick={handleBackgroundClick}>
            <div className={title}>
                <span>Create New Project</span>
            </div>

            <div className={form}>
                <div className={labels}>
                    <div>Template</div>
                    <div>Project Name</div>
                    <div>Project Folder</div>
                </div>
                <div className={fields}>
                    <input/>
                    <input/>
                    <input/>
                </div>
            </div>

            <div className={controls}>
                <div>Create</div>
            </div>
        </div>
    )
}

const mapStateToProps = state => { return {} }

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => {
            dispatch(openModal(''))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectModal)
