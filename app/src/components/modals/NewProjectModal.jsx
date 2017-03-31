import fs from 'fs'

import { remote, ipcRenderer } from 'electron'
import React from 'react'
import { openModal } from '../../actions'
import { connect } from 'react-redux'
import {modal, labels, fields, title, form, controls, selectPath} from './styles.css'

class NewProjectModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
            template: 'empty',
            projectPath: 'Select a directory'
        }
        this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePath = this.handlePath.bind(this);
    }

    handleSubmit(event) {

        // TODO:
        // This should be imported from file containing all the Node I/O operations
        const str = JSON.stringify({
            name: this.state.projectName,
            template: this.state.template
        }, null, '\t')
        const file = fs.createWriteStream(this.state.projectPath+'/rem.json')
        file.write(str)
        file.end()
        fs.mkdirSync(this.state.projectPath+'/repository')
        ipcRenderer.send('create-new-project', this.state.projectPath)
        this.props.closeModal()
        console.log(this.state)
    }

    handlePath() {
        let filename = remote.dialog.showOpenDialog({
            properties: [ 'openDirectory' ]
        })
        if (filename != undefined ) {
            this.setState({ projectPath: filename[0] })
        }
    }

    handleInputChange(event) {
        const value = event.target.value
        const name = event.target.name
        this.setState({ [name]: value })
    }

    handleBackgroundClick (e) {
        if (e.target === e.currentTarget) this.props.closeModal()
    }

    render () {
        return (
            <div className={modal} onClick={this.handleBackgroundClick}>
                <div className={title}>
                    <span>Create New Project</span>
                </div>

                <div className={form}>
                    <div className={labels}>
                        <div>Project Name</div>
                        <div>Template</div>
                        <div>Project Folder</div>
                    </div>
                    <div className={fields}>
                        <input name="projectName" onChange={this.handleInputChange} />
                        <select name="template" value={this.state.value} onChange={this.handleInputChange}>
                            <option value="empty">Empty Project</option>
                            <option value="madeja">Madeja Template</option>
                        </select>
                        <div onClick={this.handlePath} className={selectPath}>
                            {this.state.projectPath}
                        </div>
                    </div>
                </div>

                <div className={controls}>
                    <div onClick={this.handleSubmit}>Create</div>
                </div>
            </div>
        )
    }
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
