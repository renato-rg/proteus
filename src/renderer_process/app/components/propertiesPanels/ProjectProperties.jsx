import React from 'react'
import styles from './common.css'
import { T } from '../../i18n'

//Redux
import { connect } from 'react-redux'
import { setProjectInfo } from '../../state_manager/actions'

import { Chapter, Title, Subtitle, Field, Button } from './common'


/* ============ PRESENTATIONAL COMPONENT ============ */
/* ================================================= */
export class ObjectManagerDC extends React.Component {
    constructor (props) {
        super(props)
        this.inputs={}
        this.save = e => {
            const data = {childrenIDs: this.props.projectInfo.childrenIDs}
            const labels = ['version', 'creationDate', 'authors', 'name', 'description', 'comments']
            labels.map(label => {
                data[label] = this.inputs[label].value
            })
            this.props.setProjectInfo(data)
        }
    }
    render () {
        const {projectInfo} = this.props
        return (
            <div className={styles.objectManager} style={{
                padding: '35px 100px 0px 100px',
                display: this.props.isVisible ? 'flex': 'none',
                overflow: 'auto',
                position: 'absolute',
                bottom: '0',
                top: '0',
                right: '0',
                left: '0',
                zIndex: '2'  
            }}>

                <div style={{flex: '1', minWidth: '530px'}}>
                    <Title text='EDIT_PROJECT'/>
                    <Subtitle text='EDIT_PROJECT_SUBTITLE'/>
                    
                    <Chapter name='VERSIONING'/>
                    <Field inputs={this.inputs} defaultValue={projectInfo['version']} label='version' noMultiline/>
                    <Field inputs={this.inputs} defaultValue={projectInfo['creationDate']} label='creationDate' noMultiline/>
                    <Field inputs={this.inputs} defaultValue={projectInfo['authors']} label='authors'/>

                    <Chapter name='DETAILS'/>
                    <Field inputs={this.inputs} defaultValue={projectInfo['name']} label='name' noMultiline/>
                    <Field inputs={this.inputs} defaultValue={projectInfo['description']} label='description'/>
                    <Field inputs={this.inputs} defaultValue={projectInfo['comments']} label='comments'/>

                    <div className={styles.finish}>
                        <Button onClick={this.save}
                            hoverStyle={{ backgroundColor: '#576aff' }}
                            pressStyle={{ backgroundColor: '#b8c0ff' }}>
                            <T>SAVE_CHANGES</T>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

/* ======================= */
/* === STORE CONECTION === */
/* ======================= */
const ObjectManager = connect(
    state =>
        ({ projectInfo: state.appState.projectInfo }),
    dispatch =>
        ({ setProjectInfo: data => dispatch(setProjectInfo(data)) })
)(ObjectManagerDC)
export default ObjectManager