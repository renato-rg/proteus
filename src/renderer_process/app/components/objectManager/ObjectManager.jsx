import React from 'react'
import styles from './styles.css'
import update from 'immutability-helper'
import SimpleTable from '../display/SimpleTable'
import LoadImage from './LoadImage'
import CreateTableWrapper from './CreateTableWrapper'

import { T } from '../../i18n'
import { Chapter, Title, Subtitle, Button } from '../propertiesPanels/common'


const fromSchemeToInstance = (scheme, actualInstance = {}, newField) => {
    const res = {}
    Object.keys(scheme).map( section => {
        scheme[section].map( field => {
            if (actualInstance[field]!==undefined)
                res[field] = actualInstance[field]
            else if (field === newField)
                res[newField] = ''
        })
    })
    return res
}

class ObjectManager extends React.Component {
    constructor (props) {
        super(props)
        this.inputs = {}
        this.state = {
            type: '',
            prefix: '',
            image: '',
            scheme: {
            },
            defaultInstance: {
                ref: '',
                title: '',
                version: '',
                authors: '',
                creationDate: '',
                source: '',
                target: '',
                fields: {
                }
            }
        }
        this.setField = field => e => {
            this.setState({ [field]: e.target.value})
        }
        this.update = action => {
            if (action.fieldName) {
                this.setState(update(this.state, {
                    defaultInstance: { fields: { [action.fieldName]: { $set: action.newValue } } }
                }))
            } else {
                this.setState(update(this.state, {
                    defaultInstance: { [action.propName]: { $set: action.newValue } }
                }))
            }
        }
        this.addSection = e => {
            e.preventDefault()
            const value = this.newSection.value
            if (Object.keys(this.state.scheme).indexOf(value) === -1) {
                this.newSection.value = ''
                const newObj = update(this.state, {
                    scheme: { $merge: { [value]: [] } }
                })
                this.setState(newObj)
            }
        }
        this.removeSection = name => e => {
            e.preventDefault()
            const index = Object.keys(this.state.scheme).indexOf(name)
            if ( index > -1 ) {
                this.setState(update(this.state, {
                    scheme: { $unset: [name] },
                    defaultInstance: { fields: { $unset: this.state.scheme[name] } }
                }))
            }
        }
        this.addRow = section => e => {
            e.preventDefault()
            const value = this.inputs[section].value
            if (this.state.scheme[section].indexOf(value) === -1) {
                this.inputs[section].value = ''
                const newScheme = update(this.state.scheme, { [section]: { $push: [value] } })
                this.setState(update(this.state, {
                    scheme: { $set: newScheme },                    
                    defaultInstance: { fields: { $set: fromSchemeToInstance(newScheme, this.state.defaultInstance.fields, value) }}
                }))
            }
        }
        this.removeRow = (section, row) => e => {
            e.preventDefault()
            const index = this.state.scheme[section].indexOf(row)
            if (index > -1){
                this.setState(update(this.state, {
                    scheme: { [section]: { $splice: [[index, 1]] } },
                    defaultInstance: { fields: { $unset: [row] } }
                }))
            }
        }
        this.getData = () => {
            return this.state
        }
    }
    render () {

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
                    <Title text='CREATE_TABLE'/>
                    <Subtitle text='CREATE_TABLE_SUBTITLE'/>

                    <Chapter name='BASIC'/>
                    <div className={styles.rows}>
                        <div className={styles.field}>
                            <div className={styles.label}><T>PROTOTYPE_NAME</T></div>
                            <input type={'text'}
                                    className={styles.input}
                                    value={this.state.type}
                                    onChange={this.setField('type')}/>
                        </div>
                        <div className={styles.field}>
                            <div className={styles.label}><T>PROTOTYPE_PREFIX</T></div>
                            <input type={'text'}
                                    className={styles.input}
                                    value={this.state.prefix}
                                    onChange={this.setField('prefix')}/>
                        </div>
                        <div className={styles.field}>
                            <div className={styles.label}><T>PROTOTYPE_IMAGE</T></div>
                            <LoadImage className={styles.image}
                                        value={this.state.image}
                                        onChange={this.setField('image')}/>
                        </div>
                    </div>
                    <Chapter name='FIELDS'/>
                    <Subtitle text='FIELDS_DESC'/>
                    <div className={styles.fields}>
                        <div className={styles.fieldsNames}>
                            {
                                Object.keys(this.state.scheme).map( section =>
                                    <div key={section}>
                                        <div onClick={this.removeSection(section)}>X</div>
                                        <div>{section}</div>
                                        <div className={styles.sectionRows}>
                                            {
                                                this.state.scheme[section].map( row => 
                                                    <div key={row} className={styles.rowName}>
                                                        <div onClick={this.removeRow(section, row)}>X</div>
                                                        <div>{row}</div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className={styles.newRow}>
                                            <div onClick={this.addRow(section)}>
                                                <T>ADD</T>
                                            </div>
                                            <input type='text' ref={i => this.inputs[section] = i}/>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className={styles.newSection}>
                            <div onClick={this.addSection}>
                                <T>ADD</T>
                            </div>
                            <input type='text' ref={i => this.newSection = i}/>
                        </div>
                    </div>
                    <Chapter name='PREVIEW'/>
                    
                    <Subtitle text='PREVIEW_DESC'/>
                    <div className={styles.preview}>
                        <div className={styles.previewTable}>
                            <SimpleTable {...{
                                table: this.state.defaultInstance,
                                prefix: this.state.prefix,
                                update: this.update}}/>
                        </div>
                    </div>
                    <div className={styles.finish}>
                        <CreateTableWrapper getData={this.getData}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ObjectManager