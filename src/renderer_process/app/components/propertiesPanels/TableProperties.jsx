import React from 'react'
import styles from './common.css'

import Edit from 'react-icons/lib/md/edit'

import { T } from '../../i18n'

//Redux
import { connect } from 'react-redux'
import { updateNode } from '../../state_manager/actions'
import AutoHeightTextarea from '../display/AutoHeightTextarea';
import AutoHeightInput from '../display/AutoHeightInput';


import { Chapter, Title, Subtitle, Button } from './common'

const toggleBack =  on => ({
    height: '14px',
    backgroundColor: on ? '#7283ff' : '#cdd7de',
    transition: 'all 0.1s linear',
    borderRadius: '15px',
    width: '25px',
    flexDirection: 'row',
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
})
const toggleFront = on => ({
    height: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    width: '10px',
    transition: 'all 0.1s linear',
    position: 'absolute',
    left: on ? '100%' : '0%',
    marginLeft: on ? '-2px' : '2px',            
    transform: on ? 'translateX(-100%)' : 'translateX(0%)',
})

class Inputo extends React.Component {
    constructor (props) {
        super(props)        
        if (!this.props.refs.hasOwnProperty(this.props.label)) this.props.refs[this.props.label] = {}
        this.state = {
            value: this.props.defaultValue || '',
            on: this.props.defaultValue === '' || !!this.props.defaultValue
        }
        if (!this.props.noToggle) this.props.refs[this.props.label].show = this.state.on
        this.handleInput = value => {
            if ( !this.state.on && this.state.value === '' && value )
                this.setState({ value, on: true })
            this.setState({ value })
        }
        this.handleToggle = () => {
            if (!this.props.noToggle) this.props.refs[this.props.label].show = !this.state.on
            if ( this.state.on && this.state.value !=='' )
                this.setState({ value: '', on: false })
            this.setState({ on: !this.state.on })
        }
        this.handleRef = i => {
            if (this.props.noToggle)
                this.props.refs[this.props.label].show = true
            this.props.refs[this.props.label].ref=i
        }
    }
    render () {
        const Cmp = this.props.noMultiline ? AutoHeightInput : AutoHeightTextarea
        return <div style={{display: 'flex', flexDirection: 'row'}}>
            <Cmp handleRef={this.handleRef} value={this.state.value}
                className={styles.inputLeft} style={{position:'relative',zIndex:'4'}}
                onChange={this.handleInput}
            />
                <div className={styles.inputRight}>
            { !this.props.noToggle &&
                    <div style={toggleBack(this.state.on)} onClick={this.handleToggle}>
                        <div style={toggleFront(this.state.on)}/>
                    </div>
            }
                </div>
        </div>
    }
}


const Field = ({label, refs, defaultValue, noT, noToggle, noMultiline}) => {
    return (
    <div style={{display: 'flex', justifyContent: 'center', marginBottom: '15px'}}>
        <div style={{position: 'relative'}}>
            <div style={{position: 'absolute', height: '100%'}}>
                <div style={{ position: 'relative',left: '-100%',marginRight: '10px', fontSize: '12px',
                    fontWeight: '500', paddingTop: '7px'}}>
                    {noT ? label : <T>{label}</T>}
                </div>
            </div>
            <Inputo refs={refs} label={label} defaultValue={defaultValue} noToggle={noToggle} noMultiline={noMultiline}/>
        </div>
    </div>
    )
}

/* ================================================ */
/* ============ DISCONNECTED COMPONENT ============ */
/* ================================================ */
export class DocumentManagerDC extends React.Component {
    constructor (props) {
        super(props)
        this.inputs = {}
        this.fields = {}
        this.save = e => {
            const data = {
                nodeID: this.props.object.nodeID,
                childrenIDs: this.props.object.childrenIDs,
                showChildren: this.props.object.showChildren,
                type: this.props.object.type,
                fields: {}
            }
            const labels = ['version', 'creationDate', 'authors', 'title', 'ref', 'source', 'target']
            labels.map(field => {
                if (this.inputs[field].show)
                    data[field] = this.inputs[field].ref.value
            })
            Object.keys(this.props.scheme).map( section => {
                this.props.scheme[section].map( field => {
                    if (this.fields[field].show)
                        data.fields[field] = this.fields[field].ref.value
                })
            })
            this.props.updateNode(data)
        }
    }
    render () {
        const {object, scheme} = this.props
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

                    <Chapter name='HEADER'/>

                    <Field refs={this.inputs} defaultValue={object['title']} label='title' noToggle noMultiline/>

                    <Field refs={this.inputs} defaultValue={object['ref']} label='ref' noToggle noMultiline/>
                    
                    <Chapter name='VERSIONING'/>

                    <Field refs={this.inputs} defaultValue={object['version']} label='version' noMultiline/>

                    <Field refs={this.inputs} defaultValue={object['creationDate']} label='creationDate' noMultiline/>
                        
                    <Field refs={this.inputs} defaultValue={object['authors']} label='authors'/>

                    {
                        Object.keys(scheme).map(section => [
                            <Chapter key={section} name={section} noT/>,
                            <div key={section+'_'}>
                                {
                                    scheme[section].map(field =>
                                        <Field key={field} refs={this.fields} defaultValue={object.fields[field]} label={field}/>
                                    )
                                }
                            </div>
                            
                        ])
                    }

                    <Chapter name='TRACEABILITY'/>
                    <Field refs={this.inputs} defaultValue={object['source']} label='source'/>

                    <Field refs={this.inputs} defaultValue={object['target']} label='target'/>

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
const DocumentManager = connect(
    (state, ownProps) => ({
        object: state.entities[ownProps.nodeID]||{},
        scheme: state.classes.details[(state.entities[ownProps.nodeID]||{}).type].scheme
    }),
    dispatch => ({
        updateNode: data => dispatch(updateNode(data))
    })
)(DocumentManagerDC)
export default DocumentManager