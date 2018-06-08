import React from 'react'
import styles from './TableProperties.css'

import Edit from 'react-icons/lib/md/edit'

import { T } from '../../i18n'

//Redux
import { connect } from 'react-redux'
import { updateNode } from '../../state_manager/actions'

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
        this.state = { 
            value: this.props.defaultValue || '',
            on: this.props.defaultValue === '' || !!this.props.defaultValue
         }
        this.handleInput = e => {
            if ( !this.state.on && this.state.value === '' && e.target.value )
                this.setState({ value: e.target.value, on: true })
            this.setState({ value: e.target.value })
        }
        this.handleToggle = () => {
            if ( this.state.on && this.state.value !=='' )
                this.setState({ value: '', on: false })
            this.setState({ on: !this.state.on })
        }
    }
    render () {
        const {refs, label} = this.props
        return <div style={{display: 'flex', flexDirection: 'row'}}>
            <input ref={i => refs[label]=i} value={this.state.value}
                type={'text'} className={styles.input} style={{position:'relative',zIndex:'4'}}
                onChange={this.handleInput}
            />
            <div className={styles.inputRight}>
                <div style={toggleBack(this.state.on)} onClick={this.handleToggle}>
                    <div style={toggleFront(this.state.on)}/>
                </div>
            </div>
        </div>
    }
}


const Chapter = props => {
    return (
        <div className={styles.sectionTitle}>
            <div>{props.noT ? props.name : <T>{props.name}</T>}</div>
            <div/>
        </div>
    )
}
const Title = ({text}) => {
    return (
        <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center', marginBottom: '10px'}}>
            <Edit style={{color: '#949494', height: 'auto', width: '27px'}}/>
            <div style={{fontSize: '22px', fontWeight: 'bold', marginLeft: '5px'}}>
                <T>{text}</T>
            </div>
        </div>
    )
}

const Subtitle = ({text}) => <div style={{textAlign: 'justify'}}><T>{text}</T></div>
const Field = ({label, refs, defaultValue, noT}) => {
    return (        
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '15px'}}>
        <div style={{position: 'relative'}}>
            <div style={{position: 'absolute', height: '100%'}}>
                <div style={{ position: 'relative',left: '-100%',marginRight: '10px', fontSize: '12px',
                    fontWeight: '500',display: 'flex',alignItems: 'center',height: '100%'}}>      
                    {noT ? label : <T>{label}</T>}
                </div>
            </div>
            <Inputo refs={refs} label={label} defaultValue={defaultValue}/>
        </div>
    </div>
    )
}

class Button extends React.Component {
    constructor (props) {
        super(props)
        this.state = { isBeingHovered: false, isBeingPressed: false }
        this.onMouseEnter = e => this.setState({ isBeingHovered: true })
        this.onMouseLeave = e => this.setState({ isBeingHovered: false, isBeingPressed: false })
        this.onMouseDown = e => this.setState({ isBeingPressed: true })
        this.onMouseUp = e => this.setState({ isBeingPressed: false })
    }
    render () {
        const {children, onClick, className, pressStyle, hoverStyle} = this.props
        const {onMouseDown, onMouseUp, onMouseEnter, onMouseLeave} = this
        const style = Object.assign({},
            this.props.style,
            (this.state.isBeingPressed) ? pressStyle : {},
            (this.state.isBeingHovered && !this.state.isBeingPressed) ? hoverStyle : {}
        )
        return (
            <div {...{onClick, className, style, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave}}>
                {children}
            </div>
        )
    }
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
            labels.map(label => {
                data[label] = this.inputs[label].value
            })
            Object.keys(this.props.scheme).map( section => {
                this.props.scheme[section].map( field => {
                    data.fields[field] = this.fields[field].value
                })
            })
            console.log(data)
            this.props.updateNode(data)
        }
    }
    render () {
        const {object, scheme} = this.props
        return (
            <div className={styles.objectManager} style={{
                padding: '35px 100px 0px 100px', overflow: 'auto', flex: '1',
                display: this.props.isVisible ? 'flex': 'none'}}>

                <div style={{flex: '1', minWidth: '530px'}}>
                    <Title text='EDIT_DOCUMENT'/>
                    <Subtitle text='EDIT_DOCUMENT_SUBTITLE'/>
                    
                    <Chapter name='VERSIONING'/>
                    <Field refs={this.inputs} defaultValue={object['version']} label='version'/>
                    <Field refs={this.inputs} defaultValue={object['creationDate']} label='creationDate'/>
                    <Field refs={this.inputs} defaultValue={object['authors']} label='authors'/>

                    <Chapter name='HEADER'/>
                    <Field refs={this.inputs} defaultValue={object['title']} label='title'/>
                    <Field refs={this.inputs} defaultValue={object['ref']} label='ref'/>

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