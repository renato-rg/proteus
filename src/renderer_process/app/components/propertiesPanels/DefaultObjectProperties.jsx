import React from 'react'
import styles from './common.css'

import { T } from '../../i18n'

//Redux
import { connect } from 'react-redux'
import { updateNode } from '../../state_manager/actions'

import { Chapter, Title, Subtitle, Field, Button } from './common'


/* ============ PRESENTATIONAL COMPONENT ============ */
/* ================================================= */
export class DocumentManagerDC extends React.Component {
    constructor (props) {
        super(props)
        this.inputs={}
        this.save = e => {
            const data = {
                nodeID: this.props.object.nodeID,
                childrenIDs: this.props.object.childrenIDs,
                showChildren: this.props.object.showChildren,
                type: this.props.object.type
            }
            const labels = ['version', 'creationDate', 'authors', 'title', 'description', 'comments', 'source', 'target']
            labels.map(label => {
                data[label] = this.inputs[label].value
            })
            this.props.updateNode(data)
        }
    }
    render () {
        const {object} = this.props
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
                    <Title text='EDIT_OBJECT' more={this.props.object.type}/>
                    <Subtitle text='EDIT_OBJECT_SUBTITLE'/>
                    
                    <Chapter name='VERSIONING'/>
                    <Field inputs={this.inputs} defaultValue={object['version']} label='version' noMultiline/>
                    <Field inputs={this.inputs} defaultValue={object['creationDate']} label='creationDate' noMultiline/>
                    <Field inputs={this.inputs} defaultValue={object['authors']} label='authors'/>

                    <Chapter name='DETAILS'/>
                    <Field inputs={this.inputs} defaultValue={object['title']} label='title' noMultiline/>
                    <Field inputs={this.inputs} defaultValue={object['description']} label='description'/>
                    <Field inputs={this.inputs} defaultValue={object['comments']} label='comments'/>

                    <Chapter name='TRACEABILITY'/>
                    <Field inputs={this.inputs} defaultValue={object['source']} label='source'/>
                    <Field inputs={this.inputs} defaultValue={object['target']} label='target'/>

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


/* === STORE CONECTION === */
/* ======================= */
const DocumentManager = connect(
    (state, ownProps) =>
        ({ object: state.entities[ownProps.nodeID]||{} }),
    dispatch =>
        ({ updateNode: data => dispatch(updateNode(data)) })
)(DocumentManagerDC)
export default DocumentManager